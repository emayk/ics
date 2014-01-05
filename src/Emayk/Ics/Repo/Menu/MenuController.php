<?php

namespace Emayk\Ics\Repo\Menu;
use \Response;
use \Controller;
use \Input;

class MenuController extends Controller {

  protected $menu;
  public function __construct(MenuInterface $menu)
    {
        $this->menu = $menu;
    }

    /**
     * Menampilkan Semua Resource Yang Ada
     *
     * @return Response
     */


    public function index(){

      return $this->menu->getRoot();
    }



    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store()
    {
      return $this->data->create(Input::all());
    }

    public function show($id){
      return ($id == 'menu') ? $this->menu->getBy($id) :
      $this->menu->getBy($id);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function update($id)
    {
        /**
        *
        * Sesuaikan dengan Model Yang digunakan
        * - Field - field apa saja yang akan diupdate
        *
        **/

        $data = Model::find($id);
        // $data->name = Input::get('name');
        //$data->info = Input::get('info');
        $data->save(Input::all());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
        /**
        *
        * (**) danger : Mohon diperhatikan
        * Sesuaikan denga Model apakah ada syarat2 khusus
        * misal (delete record ini apakah harus ada bussiness logic khusus
        * semisal order's tidak bisa delete yang masih OPEN dlsb)
        *
        **/

        /**
        *
        * Fungsi2 yang akan dilakukan sebelum Model mendelete Record
        *
        **/

        Model::find($id)->delete();
    }

    public function RootMenu(){
       $data = Model::with('children')->where('parent_id',0);
       $total = $data->count();

       $data = $data->get()->toArray();
      return Response::json(
                            array(
                                  'success' => true,
                                  'total' => $total,
                                  // $data,
                                  // 'results' => $data,
                                  'children' => $data, //->get()->toArray(),
                                  ));

// {
//     "success": true,
//     "children": [
//         { "id": 1, "name": "Phil", "leaf": true },
//         { "id": 2, "name": "Nico", "expanded": true, "children": [
//             { "id": 3, "name": "Mitchell", "leaf": true }
//         ]},
//         { "id": 4, "name": "Sue", "loaded": true }
//     ]
// }

    }


}
