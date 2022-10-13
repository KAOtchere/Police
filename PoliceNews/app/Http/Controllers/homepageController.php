<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Models\author;
use App\Models\medium;
use App\Models\keyword;
use App\Models\post;

use Illuminate\Support\Facades\DB;

class homepageController extends Controller
{
    public function show(){
        $authorCount = author::all()->count();
        $mediaCount = medium::all()->count();
        $keywordCount = keyword::all()->count();
        $postCount = post::all()->count();

        $postsPerDay = DB::table('posts')
        ->selectRaw('month(publication_date) month, count(*) posts')
        ->groupBy('month')
        ->orderBy('month')
        ->get();
        $months = [];
        $Posts = [];

        foreach ($postsPerDay as $month => $post) {
            array_push($months, $month);
            array_push($Posts, $post->posts);
        }

        $labels = ['months', 'posts'];
        $data = [$months, $Posts];
        $postsPerDay = array_combine($labels, $data);

        $sentimentsPerMedia = DB::table('posts')
        ->selectRaw('media.medium as media, round(avg(positive),2) as positive, round(avg(negative),2) as negative, round(avg(neutral),2) as neutral')
        ->join('media', 'posts.media_id', '=', 'media.id')
        ->groupBy('media.id', 'police.media.medium')
        ->get();

        $media = [];
        $positives = [];
        $negatives = [];
        $neutrals = [];
        foreach ($sentimentsPerMedia as $sentiment) {
            array_push($positives, $sentiment->positive);
            array_push($negatives, $sentiment->negative);
            array_push($neutrals, $sentiment->neutral);
            array_push($media, $sentiment->media);
        }
        $sentimentsPerMedia = [];

        array_push($sentimentsPerMedia, array('name'=>'Postive', 'data'=> $positives));
        array_push($sentimentsPerMedia, array('name'=>'Negative', 'data'=> $negatives));
        array_push($sentimentsPerMedia, array('name'=>'Neutral', 'data'=> $neutrals));



        $popularKeywords = keyword::withCount('posts')->orderBy('posts_count', 'desc')->limit(20)->get();

        $data = [$authorCount, $mediaCount, $keywordCount, $postCount];
        $stats = [];

        array_push($stats, array('name'=>'Authors', 'count'=> $authorCount));
        array_push($stats, array('name'=>'Media', 'count'=> $mediaCount));
        array_push($stats, array('name'=>'Keywords', 'count'=> $keywordCount));
        array_push($stats, array('name'=>'Posts', 'count'=> $postCount));

        $popuKeyids = [];

        foreach($popularKeywords as $popkey){
            array_push($popuKeyids, $popkey['id']);
        }

        $keydetails = keyword::whereIn('id', $popuKeyids)->
        with(['posts' => function($query){
            return $query->take(2);
        }])
        ->limit(5)
        ->get();


        return response()->json([
            'stats' => $stats,
            'time_series' => $postsPerDay,
            'media_stats' => $sentimentsPerMedia,
            'media' => $media,
            'popular_keywords' => $popularKeywords,
            'keywords_with_details' => $keydetails
        ],200);

    }
}
