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


class Departement extends AbstractGenerate
{

	public function dept($name = '')
	{
		$name = (empty($name))
			? 'Departement ' . rand(0, 10) . '-' . rand(90, 100) . '-' .
		$this->fake->randomDigit . $this->createLetters() : $name;

		return array_merge(
			array(
				'name' => $name,
				'info' => "Information {$name}"
			), $this->othersAttributesArray());
	}



}

/** 1/9/14 **/ 