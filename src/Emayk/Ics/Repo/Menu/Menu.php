<?php namespace Emayk\Ics\Repo\Menu;
use Illuminate\Database\Eloquent\Model;
 /**
 * Menu Model
 *
 * @property integer $id
 * @property string $text
 * @property string $iconCls
 * @property integer $parent_id
 * @property string $className
 * @property string $qtip
 * @property string $qtitle
 * @property boolean $leaf
 * @property string $ids
 * @property string $parent_type
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 */
 class Menu extends Model
 {
 protected $table = 'master_menus';

     /**
      * @return \Illuminate\Database\Eloquent\Relations\MorphMany
      */
     public function items(){
         return $this->morphMany ( 'Emayk\Ics\Repo\Menu\Eloquent\Menu' , 'parent' );
     }


     /**
      * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
      */
     public function parent()
     {
         return $this->morphTo();
     }

     /**
      * @return mixed
      */
     public  function build(){



         $root = $this->take(5)->where('parent_id',0)->get(
             array('id','iconCls','text','className','parent_id')
         )->toArray();
         foreach ($root as $k => $v){
             $id = $v['id'];
            $menu[$k] = $v;
             $menu[$k]['items'] = $this->createChild($id);
         }
         return $menu;
     }

     /**
      * @param $parent_id
      * @return mixed
      */
     protected function createChild($parent_id){
             return  $this->where('parent_id',$parent_id)->get()->toArray();
     }

 }