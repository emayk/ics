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


namespace Emayk\Ics\Repo\Factory;

	/**
	 * @startuml
	 *
	 * BaseModel <|-- Product
	 * @enduml
	 */

/**
 *
 * Class Eloquent
 *
 * @package Emayk\Ics\Repo\Factory
 */
class Eloquent
{

	/**
	 * Mendapatkan Product Model
	 *
	 * @return Product\Eloquent
	 */
	public function Product()
	{
		return new Product\Eloquent();
	}

	public function note(){
		return new Note\Eloquent();
	}
}

 