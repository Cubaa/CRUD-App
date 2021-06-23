

const deleteUserBtn = document.querySelector<HTMLElement>('div.delete_user button')!
const deleteInput = document.querySelector<HTMLInputElement>('div.delete_user input')!
deleteUserBtn.addEventListener("click", (e)=>{
    e.preventDefault()
    const inputValue = deleteInput.value
    
    fetch(`/users/:${inputValue}`, {
        method:"DELETE"
    })
    .then(res=>res.json())
    .then(res=> console.log(res))
    deleteInput.value=""
})

const updateForm = document.querySelector<HTMLFormElement>('.manage_panel_form')!
const updateBtn = document.querySelector<HTMLButtonElement>('.update_user button')
const updateInputId = document.querySelector<HTMLInputElement>('[name=id]')!

updateBtn?.addEventListener("click", (e)=>{
    e.preventDefault()
const formData = new FormData(updateForm)
const updateInputIdValue = updateInputId.value

const dataObj = {
        username: formData.get('username'),
        lastname: formData.get('lastname'),
        city: formData.get('city'),
        birthdate: formData.get('birthdate')
    }

const arrObj = Object.entries(dataObj)

const filteredData = arrObj.filter((item)=>{
  
    if(item[1]!=="")
        return item;
})

if(filteredData.length===0)
    return console.log("Uzupełnij choc jedna daną")
const entries = new Map(filteredData);
const dataFilteredObj = Object.fromEntries(entries)

fetch(`/users/:${updateInputIdValue}`, {
    method: "PUT",
    body: JSON.stringify(dataFilteredObj),
    headers:{
            'Content-type': 'application/json; charset=UTF-8'
            },
})
.then(res=>res.json())
.then(res => console.log(res))

updateForm.reset()
})