const loadPhone = async (searchText, isShowAll) =>{
    const res= await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data= await res.json();
    const phones= data.data;
    displayPhone(phones, isShowAll);
}

const displayPhone = (phones, isShowAll) =>{
    const phoneContainer= document.getElementById('phone-container');
    //clear phone cards before searching for new phones
    phoneContainer.innerHTML='';

    const showAllContainer= document.getElementById('show-all-container');
    //display show all button if there are more than 12 phones
    if(phones.length>9 && !isShowAll){
      showAllContainer.classList.remove('hidden');
    }
    else{
      showAllContainer.classList.add('hidden');
    }


    //display limited phones
    if(!isShowAll){
      phones= phones.slice(0,9);
    }

    //display phones
    for(const phone of phones){
        const div= document.createElement('div');
        div.innerHTML= `
        <div class="card p-4 bg-gray shadow-xl">
                <figure class="px-10 pt-10">
                  <img src="${phone.image}" alt="Phones" class="rounded-xl" />
                </figure>
                <div class="card-body items-center text-center">
                  <h2 class="card-title">${phone.phone_name}</h2>
                  <p class='font-bold'>$999</p>
                  <div class="card-actions">
                    <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary">Show Details</button>
                  </div>
                </div>
              </div>`
        phoneContainer.appendChild(div);
    }
    toggleLoadingSpinner(false);
}

const handleShowDetail= async (id) =>{
  const res= await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const data= await res.json();
  const phone = data.data;
  console.log(phone);
  showPhoneDetails(phone);
}

const showPhoneDetails= (phone) =>{
  const phoneName= document.getElementById('show-detail-phone-name');
  phoneName.innerText= phone.name;

  const showDetailContainer= document.getElementById('show-detail-container');

  showDetailContainer.innerHTML =`
  <div class="flex justify-center items-center mb-4">
  <img src="${phone.image}" alt="" />
  </div>
  <p><span>Storage:</span>${phone?.mainFeatures?.storage}</p>
  <p><span>GPS:</span>${phone.others?.GPS || 'No GPS available'}</p>
  <p><span>GPS:</span>${phone.others?.GPS ? phone.others.GPS : 'No GPS available in this device'}</p>
  `
  show_details_modal.showModal();
}

//handle search
const handleSearch = (isShowAll) =>{
  const phoneContainer= document.getElementById('phone-container');
  toggleLoadingSpinner(true);
  const searchField= document.getElementById('search-field');
  const searchText= searchField.value;
    loadPhone(searchText, isShowAll); 
}

const toggleLoadingSpinner = (isLoading) =>{
  const loadingSpinner= document.getElementById('loading-spinner');
  if(isLoading){
    loadingSpinner.classList.remove('hidden');
  }
  else{
    loadingSpinner.classList.add('hidden');
  }
}

// handle show all
const handleShowAll = () => {
  handleSearch(true);
}


loadPhone();


