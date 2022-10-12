<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class post extends Model
{
    use HasFactory;
    use \Staudenmeir\EloquentEagerLimit\HasEagerLimit;


    protected $table = "posts";

    protected $fillable = [
        'title',
        'media_id',
        'pub_id',
        'summary',
        'publication_date',
        'positive',
        'negative',
        'neutral'
    ];

    protected $hidden = [
        'media_id',
        'pub_id',
        'pivot'
    ];

    public function authors(){
        return $this->belongsToMany(author::class, 'post_authors', 'post_id', 'author_id');
    }

    public function keywords(){
        return $this->belongsToMany(keyword::class, 'post_keywords', 'post_id', 'keyword_id');
    }

    public function publicationName(){
        return $this->belongsTo(publication_name::class, 'pub_id');
    }

    public function media(){
        return $this->belongsTo(medium::class, 'media_id');
    }

    protected $with = [
        'authors',
        'keywords',
        'publicationName',
        'media'
    ];

}
