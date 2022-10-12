<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class medium extends Model
{
    use HasFactory;

    protected $table = "media";

    protected $fillable = [
        "medium"
    ];

    public function posts(){
        return $this->hasMany(post::class, 'media_id');
    }
}
