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

namespace Emayk\Ics\Support\Markdown;

/**
* Markdown Class
*/
use dflydev\markdown\MarkdownParser,
dflydev\markdown\MarkdownExtraParser,
\File;

class Markdown implements MarkdownInterface
{
	protected $markdown;

	function __construct()
	{
			$this->markdown = new MarkdownParser();
	}

	public function render($html='#ICS Render Markdown System'){
		return $this->markdown->transformMarkdown($html);
	}

	public function loadHtml($html){
		return $this->render($html);
	}
	public function string($string)
	{
		return $this->render($string);
	}

	public function load($file){
		return $this->render($file)	;
	}

	public function extra($file){
		$extras = new MarkdownExtraParser();
		return $extras->transformMarkdown($file);
	}

	public function getFile($file)
	{
		return (substr($file, 0) == '://') ? File::getRemote($file): File::get($file);
	}
}