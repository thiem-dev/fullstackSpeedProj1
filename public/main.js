window.addEventListener('DOMContentLoaded', (e) => {
    // init();
    console.log('DOM fully loaded')
});

let LOCAL_URL=`http://localhost:3000/api`;

const getAllBtn = document.querySelector('#getAllBtn');

getAllBtn.addEventListener('click', async (e) => {
    const data = await getAllPersons(LOCAL_URL);
    console.log(data)
})

// route: api/person/
async function getAllPersons(url){
    url = `${LOCAL_URL}/person`

    try{
        const response = await fetch(url, {
            method: 'GET'
        });

        if(!response.ok){
            throw new Error(`HTTP error!`)
        }
        
        const data = await response.json();
        console.log(`GET request SUCCESS`, data)

        return data;
    } catch(error) {
        console.error('ERROR during GET request:', error)
    }
}

async function getOnePerson(id){
    const url = `LOCAL_URL/person/${id}`
    try{
        const response = await fetch(url, {
            method: 'GET'
        });

        if(!response.ok){
            throw new Error(`HTTP error!`)
        }
        
        const data = await response.json();
        console.log(`GET request SUCCESS`, data)

        return data;
    } catch(error) {
        console.error('ERROR during GET request:', error)
    }
}


async function insertUser(obj){
    try{
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(obj)
        });

        if(!response.ok){
            throw new Error(`HTTP error!`)
        }
        const data = await response.json();
        console.log(`GET request SUCCESS`, data)

        return data;
    } catch(error) {
        console.error('ERROR during GET request:', error)
    }
}

