   
    const btn = document.querySelector<HTMLElement>('form button')!
    const input = document.querySelector<HTMLInputElement>('form input')!
   

    btn.addEventListener("click", (e)=>{
        const form = document.querySelector('form')!
        const formData = new FormData(form)
        e.preventDefault()
        
        const inputValue = input.value
       
        const username = formData.get('username')
        
        fetch('/user', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
            body: JSON.stringify({
                username: formData.get('username'),
                lastname: formData.get('lastname'),
                city: formData.get('city'),
                birthdate: formData.get('birthdate')
            })
        })
        .then((res)=> res.json())
        .then(res=>{
            
        
            if(username!=="")
                window.location.href = '/success'
            else window.location.href = '/'
        })

        form.reset()
    })
    export = {}