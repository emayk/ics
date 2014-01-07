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
		**/

	 namespace Emayk\Ics\Repo\Bank;

	 /**
		* Bank Controller
		*/
	 use \Controller;

	 /**
		* Class BankController
		*
		* @package Emayk\Ics\Repo\Bank
		*/
	 class BankController extends Controller
	 {
			/**
			 * @var BankInterface
			 */
			protected $bank;

			/**
			 * @param BankInterface $bank
			 */
			function __construct (BankInterface $bank)
			{
				 $this->bank = $bank;
			}

			/**
			 * @return Response
			 */
			public function index ()
			{

				 return $this->bank->all ();
			}

			/**
			 * @param $id
			 *
			 * @return Response
			 */
			public function show ($id)
			{
				 return $this->bank->find ($id);
			}

			/**
			 * @param $id
			 *
			 * @return Response
			 */
			public function edit ($id)
			{
				 return $this->bank->find ($id);
			}

			/**
			 * @return Response
			 */
			public function store ()
			{
				 return $this->bank->store ();
			}

			/**
			 * @param $id
			 *
			 * @return Response
			 */
			public function update ($id)
			{

				 return $this->bank->update ($id);
			}

			/**
			 * Proses Hapus Record
			 * @param $id
			 *
			 * @return Response
			 */
			public function destroy($id)
			{
				 return $this->bank->delete($id);
			}

	 }