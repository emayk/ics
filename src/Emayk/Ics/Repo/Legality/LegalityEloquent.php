<?php
namespace Emayk\Ics\Repo\Legality;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use \Response;
use \Input;

class LegalityEloquent implements LegalityInterface{
    protected $legality;
    function __construct(Legality $legality)
    {
        $this->legality = $legality;
    }

    /**
     * Mendapatkan Semua Departement
     */
    public function all(){

    }

    public function getById($id){
        return $this->legality->find($id);
    }

    /**
     * @return mixed
     */
    public function getAll()
    {
        $page = \Input::get('page');
			 $limit = \Input::get('limit',1);
			 $start = \Input::get('start',1);
        $_data = $this->legality
            ->orderBy('id','DESC')
            ->skip($start)
            ->take($limit)
            ->get()->toArray();
        $total = $this->legality
            ->all()->count();

        $data = array(
            'success' => true,
            'results' => $_data,
            'total' => $total
        );

        return \Response::json($data)
            ->setCallback(\Input::get('callback'));

    }

    /**
     * Simpan Departement
     * (New Departement)
     *
     * @return mixed
     */
    public function save()
    {
        if (\Auth::guest()) return 'false';

        $this->legality->name = Input::get('name');
        $this->legality->info = Input::get('info');
        $this->legality->uuid = uniqid('New_');
        $this->legality->createby_id = \Auth::user()->id;
        $this->legality->lastupdateby_id = \Auth::user()->id;
        $this->legality->created_at = new Carbon();
        $this->legality->updated_at = new Carbon();
        $saved = $this->legality->save() ? true : false ;
        return Response::json(array(
            'success' => $saved,
            'results' => $this->legality->toArray()
        ))->setCallback();
    }

    /**
     * Menghapus Departement
     *
     * @param $id
     * @return mixed
     *
     */
    public function delete($id)
    {
        // Bisa delete kalau memiliki akses
        if ($this->hasAccess())
        {
            $deleted = $this->legality
                ->find($id)
                ->delete();

            return \Icsoutput::toJson(array(
                'results' => $deleted
            ),$deleted);

        }else{
            return \Icsoutput::toJson(array(
                'results' => false,
                'reason' => 'Dont Have Access to Delete '
            ),false);
        }
    }

    /**
     * Update Informasi Departement
     *
     * @param $id
     * @return mixed
     */
    public function update($id)
    {
        $db = $this->legality->find($id);
        $db->name = Input::get('name');
        $db->info = Input::get('info');
        $db->uuid = uniqid('Update_');
        return $db->save();
    }

    protected function  hasAccess(){

        return (isset( \Auth::user()->id ) );
    }

    public function goedit($id)
    {
        return 'Page Edit with ID '.$id;
    }

    public function goshow($id)
    {
        return 'Page Show with ID '.$id;
    }

    /**
     *
     * Page Create Legalitas
     *
     * @return mixed
     */
    public function pageCreate()
    {
        // TODO: Implement pageCreate() method.
    }


}