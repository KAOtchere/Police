<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class publication_name extends Model
{
    use HasFactory;

    protected $table = "publication_names";

    protected $fillable = [
        "name"
    ];

    public function posts(){
        return $this->hasMany(post::class, 'pub_id');
    }

}
