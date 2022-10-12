<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class author extends Model
{
    use HasFactory;

    protected $table = "authors";

    protected $fillable = [
        "name"
    ];

    protected $hidden = ['pivot'];

    public function posts(){
        return $this->belongsToMany(post::class, 'post_authors', 'author_id', 'post_id');
    }

}
