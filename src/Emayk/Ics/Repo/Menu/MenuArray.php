<?php namespace Emayk\Ics\Repo\Menu;
use \Response;
use \Icsoutput;
/**
* 	Menu Array
*/
class MenuArray implements MenuInterface
{

	/**
	*
	* Mendapatkan Root Menu
	* @return array Menu Root berupa Array
	**/
	protected $data;
	protected $id;

	/**
	*
	* Mendapatkan Root Menu
	*
	**/

	public function getRoot(){

		$data = array();
		$jml_menu = 5;
		$this->setId($jml_menu);
		 for ($i=1; $i <=$jml_menu ; $i++) {
		 		$root =  $this->generate_menu($i);
		 			$id = $i;
		 			$parent_id = count($data);
		 			$child = $this->createChild($id,$parent_id);
		 			$data[] = array_merge($root,array(
              'count_children'=> count($child),'items' => $child) );
		 			$this->data = $data;

		 }
		 return Icsoutput::toExtjs($data);
	}

		protected function setId($id)
		{
			return $this->id = $id;
		}

		protected function getId()
		{
			return $this->id;
		}
		/**
		*
		* Mendapatkan Menu Berdasarkan Id Yang diberikan
		*@param integer $id ID Menu
		* @return array
		**/

		public function getBy($id){
			return ($id == 'menu') ? $this->getRoot() : $this->createChild($id);
		}

		public function create(array $data){
				return Icsoutput::json($data);
		}

		/**
		*
		* Membuat Menu Child
		*
		**/
		protected function createChild($id,$parent_id){
			$child = array();
			$getId = $this->getId();
			for ($i=$getId; $i <= $getId+10; $i++) {
				$child[] = $this->generate_menu($id+$i,'child',$parent_id);
			}
			return $child;
		}

		/**
		*
		* Membuat Menu Array
		*
		**/

		protected function generate_menu($id,$type = 'root',$parent_id=0){
			$text = '';

			if ($type == 'root'){
					$text = 'Menu Master '. $id;
					$parent_id = 0 ;
			}else{
					$text = 'Menu Child '.$parent_id.'-'. $id;
			};
			return array('id' => $id,
		 		                'iconCls' => 'home',
		 		                'className' => 'container',
		 		                'text' => $text,
		 		                'parent_id' => $parent_id
			              );

		}
}