<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Jexcel extends CI_Controller {

    public function __construct(){
        parent::__construct();
        
    }

    public function index()
    {
        $data['css'] = array(
            'lib/jexcel/jexcel.css',
            'lib/jexcel/jsuites.css'
        );
        $data['js'] = array(
            'lib/jexcel/jexcel.js',
            'lib/jexcel/jsuites.js',
            'src/js/sample.js'
        );

        $data['testing'] = 'Hallo !';

        $this->l_skin->main('samples/view', $data);
    }

    public function get_data()
    {
        $get_all = $this->db->query('SELECT * FROM tbl_jexcel');         
        $data = array();
        foreach ($get_all->result() as $id) {
            $data[] = array(
                'name1' => $id->name,
                'no_passport1' => $id->no_passport,
                'gender1' => $this->gender_selected($id->gender),
                'tgl_lahir1' => $id->tgl_lahir,
                'id1' => $id->id
            );
        }
        echo json_encode($data);
    }

    public function get_data_array()
    {
        $get_all = $this->db->query('SELECT * FROM tbl_jexcel');    
        $data = $get_all->result_array();   
        
        echo json_encode($data);
    }

    function gender_selected($data)
    {
        return ($data == 1) ? 'Male' : 'Female';
    }

    function update_data()
    {
        $name = $this->input->post('s_name');
        $id = $this->input->post('s_id');

        $data = array(
            'name' => $name
        );
        $this->db->where('id', $id);
        $this->db->update('tbl_jexcel', $data);


    }


    public function sample2()
    {
        $data['css'] = array(
            'lib/jexcel/jexcel.css',
            'lib/jexcel/jsuites.css'
        );
        $data['js'] = array(
            'lib/jexcel/jexcel.js',
            'lib/jexcel/jsuites.js',
            'src/js/sample2.js'
        );

        $data['testing'] = 'Hallo !';

        $this->l_skin->main('samples/view2', $data);
    }
    
    function ambil_data()
    {
        $excelData = json_decode($this->input->post('dataExcel'));
        $returnData = array();

        foreach ($excelData as $row) {

            if(empty($row[0])){
                $returnData[] = array(
                    $row[0],
                    $row[1],
                    $row[2],
                    $row[3],
                    '<p class="text-danger"><i class="fa fa-times-circle-o"></i> Data baris Nama tidak lengkap !</p>',
                );
                continue;
            }

            if(empty($row[1])){
                $returnData[] = array(
                    $row[0],
                    $row[1],
                    $row[2],
                    $row[3],
                    '<p class="text-danger"><i class="fa fa-times-circle-o"></i> Data baris no passport tidak lengkap !</p>',
                );
                continue;
            }

            $returnData[] = array(
                $row[0],
                $row[1],
                $row[2],
                $row[3],
                'Data nama tidak kosong !',
            );

        }

        $dataResponse = array(
            'dataValid' => true,
            'dataFeedback' => $returnData
        );

        echo json_encode($dataResponse);

    }

}