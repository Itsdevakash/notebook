import { Button, Divider, Empty, Form, Input, Modal } from 'antd';
import {Edit2,Plus,Trash2,File } from 'lucide-react'
import React, { useState } from 'react'
import { useNote } from "./zustand/useNote"; 
import { nanoid } from 'nanoid';
import moment from 'moment';

export default function App() {
  const[open,setOpen] = useState(false)
  const [form] = Form.useForm()
  const setNote = useNote((state) => state.setNote);
    const notes = useNote((state) => state.notes);
    const deleteNote = useNote((state) => state.deleteNote);
    const updateNote = useNote((state) => state.updateNote);
    const [read,setRead] = useState(null);
    const [editeid,setEditeid] = useState(null);

const hadlecancel=()=>{
setOpen(false);
form.resetFields();
setEditeid(null)
}

 const createNote = (values) => {
  if (editeid) {  
    updateNote(editeid, {
      ...values,
      date: new Date(),
    });     
  } else { 
    const newNote = {
      ...values,
      id: nanoid(),
      date: new Date(),
    };
    setNote(newNote);
  }
     setRead(values)
   
 hadlecancel()
};


  const deletedata = (id)=>{ 

        setRead(null)
        deleteNote(id)
  }

  const editNote = (item) => {
       setOpen(true);
    setEditeid(item.id);
    console.log(item.id);
 

    setTimeout(() => {
      form.setFieldsValue(item);
    }, 0);
  };

  return (
    <div className='min-h-screen bg-gray-200'>  
      <aside className='overflow-auto space-y-6 px-4 py-8 bg-[linear-gradient(291deg,_#30cfd0,_#330867,_hsl(48.1,_65.25028388938517%,_54.18143423701992%))] fixed top-0 left-0 w-[300px] h-full'>  
       
       <div className='bg-white p-3 rounded-lg space-y-6'>

        {

        notes.map((item,index)=>(
                 <button  onClick={()=>setRead(item)} key={index} className='flex items-start gap-1 hover:bg-gray-100 p-2 rounded-lg w-full transition-colors duration-300 cursor-pointer '>
                  <File className='w-4 h-4 mt-[5px]' />
                  <div className='flex flex-col'>
                  <h1 className='text-black/80 text-left font-medium capitalize'>{item.filename}</h1>
                   <label className='text-gray-500 text-xs text-left'>{moment(item.date).format("DD MM YYYY hh:mm A")}</label>
                  </div>
             
                 </button>
          ))
        }

       </div>

       <button onClick={()=>setOpen(true)} className='flex items-center gap-1 bg-rose-500 text-white font-medium w-full py-3 justify-center rounded-lg  hover:scale-105 transition-transform duration-300'>
        <Plus />
        New File 
       </button>











      </aside>

   <section className='ml-[300px] py-12'>

   {

    read ?

    
    <div className='w-10/12 mx-auto bg-white rounded-xl'>

    
    <div className='px-6 py-4 border-b border-gray-300 border-dashed flex justify-between items-center'>
      <div>
           <h1 className='text-lg font-medium'>{read.filename}</h1>
           <label className='text-gray-500 text-xs'>{moment(read.date).format("DD MM YYYY hh:mm A")}</label>
      </div>

       <div className='space-x-3'>
          <button  key={read.id} onClick={() => editNote(read)}  className='bg-green-600 p-2 rounded text-white hover:bg-green-600 hover:scale-105 transition-transform duration-300'>
            <Edit2 className='w-3 h-3 ' />
          </button>
          

           <button onClick={()=>deletedata(read.id)} className='bg-rose-600 p-2 rounded text-white hover:bg-rose-600 hover:scale-105 transition-transform duration-300'>
            <Trash2 className='w-3 h-3 ' />
          </button>
      </div>
   
    </div>




    <div className='p-6'>
      <p className='text-gray-500'>{read.content}</p>
      
    </div>

    </div>


    :

       
    <div className="w-10/12 mx-auto bg-white rounded-xl p-16 flex items-center justify-center">
      <Empty description="Choose a file to read" />
    </div>

   }



   </section>

   <Modal open={open} footer={null} onCancel={hadlecancel} width={"80%"}  maskClosable={false}>
    <h1 className='text-xl font-semibold'>{  editeid ?  "Update a file" : "Create a new file" }</h1>
    <Divider />

    <Form layout='vertical' onFinish={createNote}  form={form}>
   <Form.Item
   name="filename" 
   label="File Name"
   rules={[{required:true}]}
   >
    <Input size='large' placeholder=' Enter file name'/>
   </Form.Item>
    

    <Form.Item 
     label="Content"
     name="content"
     rules={[{required:true}]}
    >
    <Input.TextArea size='large' placeholder='Content goes here...' rows={5} />

    </Form.Item>

    {

      editeid ?
 <Form.Item>
        <Button size='large' type='info' htmlType='submit'>Update</Button>
       </Form.Item>
      :
 <Form.Item>
        <Button size='large' type='primary' htmlType='submit'>Submit</Button>
       </Form.Item>
      
    }
      


    </Form>



   </Modal>



    </div>
  )
}
