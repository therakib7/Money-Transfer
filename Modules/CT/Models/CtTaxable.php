<?php

namespace Modules\CT\Models;

use Illuminate\Database\Eloquent\Model;

class CtTaxable extends Model {
 
	protected $fillable = [
		'ct_taxonomy_id',
		'ct_taxable_type'
		'ct_taxable_id',
	];

}
