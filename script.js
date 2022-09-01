//fetching data from the phone api
const loadPhoneAsync = async (searchPhone, phoneLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchPhone}`
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayPhones(data.data, phoneLimit);
    } catch (error) {
        console.log(error);
    }
}


//display phone data to the UI
const displayPhones = (phones, phoneLimit) => {
    //console.log(phones);
    const phoneHolder = document.getElementById('phone-holder');
    phoneHolder.textContent = '';
    const alertElem = document.getElementById('alert');
    const btnShowAllDiv = document.getElementById('show-all');

    //condition for the data limit and button show all or not
    if (phoneLimit && phones.length > 12) {
        phones = phones.slice(0, 12)
        btnShowAllDiv.classList.remove('d-none');
    } else {
        btnShowAllDiv.classList.add('d-none')
    }
    phones.length === 0 ? alertElem.classList.remove('d-none') : alertElem.classList.add('d-none');

    phones.forEach(phone => {
        const { brand, image, phone_name, slug } = phone;
        const phoneCard = document.createElement('div')
        phoneCard.classList.add('col-3');
        phoneCard.innerHTML =
            `<div class="card h-100 p-4 shadow " >
             <img src="${image}" class="card-img-top" alt="...">
                <div class="card-body text-center">
                    <p class="card-title fs-5 fw-bolder">${phone_name}</p>
                    <p class="card-text fw-semibold ">Brand: ${brand}</p>
                    <div class="d-grid gap-2 ">
                    <button class="btn btn-primary btn-sm fw-semibold btn-select-player"
                        type="button" style="--bs-btn-padding-y: .6rem;" onclick ="loadPhoneDetails('${slug}')" data-bs-toggle="modal" data-bs-target="#showPhoneDetails">Show Details</button>
                </div>
                </div>
            </div>
        `
        phoneHolder.appendChild(phoneCard)
    });
    //End loader
    toggleLoader(false)
}

//data loading by id of every phone to show the details of the phone
const loadPhoneDetails = async (id) => {
    try {
        const url = `https://openapi.programming-hero.com/api/phone/${id}`
        const res = await fetch(url);
        const data = await res.json();
        displayPhoneDetails(data.data);
    } catch (error) {
        console.log(error);
    }

}

//phone details display to the onclick of Show all button
const displayPhoneDetails = (details) => {
    const { name, mainFeatures, brand, image, releaseDate, others } = details;
    const { storage, displaySize, memory } = mainFeatures;
    const { GPS, NFC } = others;
    const modalHolder = document.getElementById('modal-body');
    modalHolder.innerHTML = '';
    const modal = document.createElement('div');
    modal.innerHTML = `
        <div class = 'text-center mt-1 mb-3'>
            <img style="width:230px" class="h-100 card-img-top  " src="${image}" alt="">
        </div>
        <div class = 'd-flex justify-content-center align-items-center flex-column'>
            <h3 >${name}</h3>
            <h4> ${brand}</h4>
            <h5> ${releaseDate ? releaseDate : 'Will be added soon'}</h5>
        </div>
        <hr>
        <h6 class = 'fw-bold'>Main Features</h6>
        <hr>
        <p ><span class = 'fw-bold text-secondary'>Storage</span>: ${storage}</p>
        <p><span class = 'fw-bold text-secondary'>Display</span>: ${displaySize}</p>
        <p><span class = 'fw-bold text-secondary'>Memory</span>       : ${memory}</p>
        <hr>
        <h6 class = 'fw-bold'>Others</h6>
        <hr>
        <p><span class = 'fw-bold text-secondary'>GPS</span> :${GPS}</p>
        <p><span class = 'fw-bold text-secondary'>NFC</span> :${NFC}</p>
    `
    modalHolder.appendChild(modal)
}

//search functionality
const phoneSearch = (e) => {
    e.preventDefault();
    processSearch(12)
}

//spinner added while loading 
const toggleLoader = isLoading => {
    const spinner = document.getElementById('spinner');
    if (isLoading) {
        spinner.classList.remove('d-none')
    } else {
        spinner.classList.add('d-none')
    }
}

//common function for 
const processSearch = (phoneLimit) => {
    //start loader
    toggleLoader(true)
    const inputElem = document.getElementById('phone-input');
    //console.log(inputElem);
    const inputElemValue = inputElem.value;
    loadPhoneAsync(inputElemValue, phoneLimit);
}

//show all button functionality
document.getElementById('btn-show-all').addEventListener('click', () => {
    processSearch();
})

//by default all product will be loaded
loadPhoneAsync('oppo'); 