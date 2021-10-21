<?php

namespace Modules\DOC\Models;

use Illuminate\Database\Eloquent\Model;

class Taxable extends Model {

	protected $connection = 'oz_doc';
	
	protected $fillable = [
		'taxonomy_id',
		'taxable_type'
		'taxable_id',
	];

}
