document.addEventListener('DOMContentLoaded', function () {
  const filters = document.querySelectorAll('.filter');
  const jobs = document.querySelectorAll('.job');

  // Add click event listeners to each filter button
  filters.forEach(filter => {
    const buttons = filter.querySelectorAll('button');
    buttons.forEach(button => {
      button.addEventListener('click', function () {
        const filterType = filter.dataset.filter;
        const filterValue = button.dataset.value;

        // Remove 'active' class from all buttons in the current filter
        buttons.forEach(btn => {
          btn.classList.remove('active');
        });

        // Add 'active' class to the clicked button
        button.classList.add('active');

        // Filter the jobs based on the selected filter
        jobs.forEach(job => {
          const value = job.dataset[filterType];

          // Show the job if the filter value is 'all' or matches the job's value
          if (filterValue === 'all' || filterValue === value) {
            job.style.display = 'block';
          } else {
            job.style.display = 'none';
          }
        });
      });
    });
  });
});
