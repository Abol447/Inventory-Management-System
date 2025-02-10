const addNewCategory = document.getElementById('addNewCategory');
const categoryDescription = document.getElementById('categoryDescription');
const CategorySelect = document.getElementById('CategorySelect');
const btnAddCTG  =document.getElementById('btnAddCTG');
const saveBtn = document.getElementById('save');
let categoryInfo = [];
const optionClass = " bg-slate-300 text-slate-900" ;
fetch("http://localhost:3000/categories")
.then((x) => x.json())
.then((x) => x.map((y)=>optCreaterCategory(y.title)))
.catch((e)=> console.log(e));
const optCreaterCategory = (txt)=>{
    let opt = document.createElement('option');
    opt.innerHTML = txt;
    opt.className = optionClass;
    CategorySelect.append(opt);
}
const send = (title,description)=>{
    let info ={
        "title": `${title}`,
        "description":`${description}`
    }
    fetch("http://localhost:3000/categories",{
        method :"POST",
        headers:{
            "Content-Type": "application/json"          
        },
        body:JSON.stringify(info)
    }).then((res)=>res.json())
      .then((res)=> console.log(res))
      .catch ((err)=> console.log(err));    
}
btnAddCTG.addEventListener('click',()=>{
    if(addNewCategory.value.length>0 && categoryDescription.value.length>0)
        {
            optCreaterCategory(addNewCategory.value);
             send(addNewCategory.value,categoryDescription.value)
            addNewCategory.value =''
            categoryDescription.value = ''
        }
})