<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class keyword extends Model
{
    use HasFactory;
    use \Staudenmeir\EloquentEagerLimit\HasEagerLimit;

    protected $table = "keywords";

    protected $fillable = [
        "keyword"
    ];

    public function posts(){
        return $this->belongsToMany(post::class, 'post_keywords', 'keyword_id', 'post_id');
    }




    protected $hidden = ['pivot'];

}
