const filter_by = [];

const display = document.getElementById('display');
const banner = document.getElementById('banner');
const filterContainer = document.createElement('div'); // New filter container

const displayListing = (data_array) => {
  display.innerHTML = '';
  for (let data of data_array) {
    const card = createCard(data);
    display.appendChild(card);
  }
};

const createCard = (card_data) => {
  // CARD
  const card = document.createElement('div');
  card.className = 'card';
  
// // LEFT -> image_container | card_info
  const left = document.createElement('div');
  left.className = 'card-left flex';

  const img_container = document.createElement('div');
  img_container.className = 'image-container';
  const img = document.createElement('img');
  img.src = card_data.logo;
  img_container.appendChild(img);

  left.appendChild(img_container);

  const card_info = document.createElement('div');
  card_info.className = 'card-left-info';

  const left_section_1 = document.createElement('div');
  left_section_1.classList.add('section');

  const p_company = document.createElement('h2');
  p_company.className = 'company';
  p_company.innerText = card_data.company;

  const p_new = document.createElement('p');
  p_new.className = 'new';
  if (card_data.new) {
    p_new.innerText = 'New';
    left_section_1.appendChild(p_new);
  }

  const p_feature = document.createElement('p');
  p_feature.className = 'featured';
  if (card_data.featured) {
    p_feature.innerText = 'Featured';
    left_section_1.appendChild(p_feature);
  }

  left_section_1.appendChild(p_company);

  const left_section_2 = document.createElement('div');
  left_section_2.classList.add('section');
  const p_position = document.createElement('h2');
  p_position.innerText = card_data.position;
  left_section_2.appendChild(p_position);

  const left_section_3 = document.createElement('div');
  left_section_3.classList.add('section', 'metric');
  const p_posted_at = document.createElement('p');
  p_posted_at.innerText = card_data.postedAt;
  const p_contract = document.createElement('p');
  p_contract.innerText = card_data.contract;
  const p_location = document.createElement('p');
  p_location.innerText = card_data.location;

  left_section_3.appendChild(p_posted_at);
  left_section_3.appendChild(p_contract);
  left_section_3.appendChild(p_location);

  card_info.appendChild(left_section_1);
  card_info.appendChild(left_section_2);
  card_info.appendChild(left_section_3);

  left.appendChild(card_info);

  const right = document.createElement('div');
  right.className = 'card-right';
  const skills = skillContainer(card_data.languages);
  right.appendChild(skills);

  card.appendChild(left);
  card.appendChild(right);

  return card;
};



// Search Functionality
const searchInput = document.getElementById('search-input');
const jobListings = document.querySelectorAll('.job-listing'); // Select job listings

searchInput.addEventListener('input', () => {
  const searchTerm = searchInput.value.toLowerCase();

  jobListings.forEach((jobListing) => {
    const title = jobListing.querySelector('.job-title').textContent.toLowerCase();
    const description = jobListing.querySelector('.job-description').textContent.toLowerCase();

    if (title.includes(searchTerm) || description.includes(searchTerm)) {
      jobListing.style.display = 'block';
    } else {
      jobListing.style.display = 'none';
    }
  });
});



// // Filtering System
// const filterButtons = document.querySelectorAll('.filter-button');

// filterButtons.forEach((filterButton) => {
//   filterButton.addEventListener('input', () => {
//     const category = filterButton.dataset.category;

//     jobListings.forEach((jobListing) => {
//       const jobCategory = jobListing.dataset.category;

//       if (category === 'all' || category === jobCategory) {
//         jobListing.style.display = 'block';
//       } else {
//         jobListing.style.display = 'none';
//       }
//     });
//   });
// });



const skill_filter_container = (filter_by = []) => {
  const filter_container = document.createElement('div');
  filter_container.className = 'filter-container';
  const ul = document.createElement('ul');

  for (let filter of filter_by) {
    const li = document.createElement('li');
    li.innerText = filter;
    ul.appendChild(li);
  }

  filter_container.appendChild(ul);
  const clear_btn = document.createElement('button');
  clear_btn.className = 'clear-btn';
  clear_btn.innerText = 'X';

  clear_btn.addEventListener('click', () => {
    clearFilter();
    banner.removeChild(filter_container);
    filterJobs(filter_by);
  });

  filter_container.appendChild(clear_btn);
  return filter_container;
};

const clearFilter = () => {
  filter_by.length = 0;
};

const skillContainer = (languages = []) => {
  const skills_container = document.createElement('ul');
  skills_container.className = 'skill-container';

  if (languages) {
    for (let language of languages) {
      const btn_skill = document.createElement('button');
      btn_skill.className = 'skills';
      btn_skill.innerText = language;

      btn_skill.addEventListener('click', (e) => {
        e.preventDefault();
        if (!filter_by.includes(language)) {
          filter_by.push(language);
        }
        const filter_container = skill_filter_container(filter_by);
        banner.appendChild(filter_container);
        filterJobs(filter_by);
      });

      skills_container.appendChild(btn_skill);
    }
  }

  return skills_container;
};

const filterJobs = (filter_by) => {
  const filtered_jobs = data_array.filter((job) => {
    return filter_by.every((skill) => job.languages.includes(skill));
  });

  displayListing(filtered_jobs);
};

const loadJobs = (data_array) => {
  filterContainer.innerHTML = ''; // Clear the filter container
  banner.appendChild(filterContainer); // Add the filter container to the banner
  displayListing(data_array);
};

loadJobs(data_array);
