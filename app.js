const express = require('express');
const fs = require('fs');

const app = express();
app.use(express.json());

const data =[
    {id:1,name:"abdullahi abdulkadir" },
    {id:2,name:"salah abdulkadir" },
    {id:3,name:"hassan abdulkadir" },
];

const dataPath = './students.json';
const writeStudentInfo=()=>{
    fs.writeFileSync(dataPath,JSON.stringify(data,null,2));
}

const getStudentById=(id)=>{
    return data.find((student)=> student.id);
}


app.post('/students', (req, res) => {
    const { id, name, age, grade } = req.body;
  
    const student = { id, name, age, grade };
    data.push(student);
  
    writeStudentData();
  
    res.status(201).json({ message: `Student with ID ${id} created successfully.` });
  });



app.put('/students/:id', (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
  
    const student = data.find((student) => student.id === parseInt(id));
    if (student) {
      Object.assign(student, updatedData);
      writeStudentData();
      res.json({ message: `Student with ID ${id} updated successfully.` });
    } else {
      res.status(404).json({ message: `Student with ID ${id} not found.` });
    }
  });

app.delete('/students/:id', (req, res) => {
    const { id } = req.params;
  
    const index = data.findIndex((student) => student.id === parseInt(id));
    if (index !== -1) {
      data.splice(index, 1);
      writeStudentData();
      res.json({ message: `student with ID ${id} deleted successfully.` });
    } else {
      res.status(404).json({ message: `Student with ID ${id} not found.` });
    }
  });

app.get('/students', (req, res) => {
    res.json(data);
  });
  


app.listen(3003, () => {
    console.log('Server is running on port 3003');
  });


