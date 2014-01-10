<?php
/**
* Copyright (C) 2013  Emay Komarudin
* This program is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
* GNU General Public License for more details.
* You should have received a copy of the GNU General Public License
* along with this program. If not, see <http://www.gnu.org/licenses/>.
*
* @author Emay Komarudin
*
**/



namespace Emayk\Ics\Support\Dummy\Faker;


class Legality extends AbstractGenerate{
	public function legality()
	{
		$name = 'Legality '.$this->createLetters().'-'.rand(100,200);
		return array_merge(
			array(
				'name' => $name,
				'info' => "Information {$name}"
			),
			$this->othersAttributesArray()
		);
	}

	public function createLegalities($count = 10)
	{
		for ($l = 0 ; $l < $count;$l++)
		{
			$legal[] = $this->legality();
		}
		return $legal;
	}
}

/** 1/9/14 **/ 