$(function () {
  // -------------------------
  // Revenue line chart
  // -------------------------
  const revenueCtx = document.getElementById('revenueChart');

  const revenueGradient = revenueCtx.getContext('2d').createLinearGradient(0, 0, 0, 260);
  revenueGradient.addColorStop(0, 'rgba(197,163,244,.20)');
  revenueGradient.addColorStop(1, 'rgba(197,163,244,0)');

  const revenueChart = new Chart(revenueCtx, {
    type: 'line',
    data: {
      labels: ['1','4','8','12','16','20','24','28','31'],
      datasets: [
        {
          label: 'Revenue',
          data: [3.2, 4.1, 3.4, 3.0, 3.7, 3.5, 3.9, 3.3, 3.8],
          borderColor: '#c5a3f4',
          backgroundColor: revenueGradient,
          fill: true,
          tension: .45,
          borderWidth: 2,
          pointRadius: 0
        },
        {
          label: 'Subscriptions',
          data: [3.6, 3.7, 3.5, 3.2, 3.8, 3.4, 3.5, 3.6, 4.0],
          borderColor: '#f6d45e',
          backgroundColor: 'transparent',
          fill: false,
          tension: .45,
          borderWidth: 2,
          pointRadius: 0
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          mode: 'index',
          intersect: false,
          backgroundColor: '#202024',
          borderColor: '#444',
          borderWidth: 1
        }
      },
      scales: {
        x: {
          grid: { color: 'rgba(255,255,255,.035)' },
          ticks: { color: '#77777d', font: { size: 9 } },
          border: { display: false }
        },
        y: {
          min: 2,
          max: 5,
          ticks: { color: '#77777d', font: { size: 9 } },
          grid: { color: 'rgba(255,255,255,.05)' },
          border: { display: false }
        }
      }
    }
  });

  // -------------------------
  // Installs bar chart
  // -------------------------
  const installsChart = new Chart(document.getElementById('installsChart'), {
    type: 'bar',
    data: {
      labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
      datasets: [
        {
          label: 'iOS',
          data: [360, 290, 240, 315, 562, 270, 350],
          backgroundColor: '#c5a3f4',
          borderRadius: 13,
          borderSkipped: false,
          barThickness: 42
        },
        {
          label: 'Android',
          data: [180, 240, 150, 210, 286, 190, 245],
          backgroundColor: '#f6d45e',
          borderRadius: 13,
          borderSkipped: false,
          barThickness: 42
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: {
          stacked: true,
          grid: { display: false },
          ticks: { color: '#88888e', font: { size: 9 } },
          border: { display: false }
        },
        y: {
          display: false,
          stacked: true,
          beginAtZero: true,
          grid: { display: false }
        }
      }
    }
  });

  // -------------------------
  // Age doughnut chart
  // -------------------------
  const ageChart = new Chart(document.getElementById('ageChart'), {
    type: 'doughnut',
    data: {
      labels: ['18–30 years','30–45 years','45–60 years','60+ years'],
      datasets: [{
        data: [46, 32, 18, 4],
        backgroundColor: ['#c5a3f4','#f6d45e','#49c9e8','#72e5ad'],
        borderColor: '#151515',
        borderWidth: 2,
        hoverOffset: 5
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '48%',
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: '#202024',
          callbacks: {
            label: function (ctx) {
              return ctx.label + ': ' + ctx.raw + '%';
            }
          }
        }
      }
    }
  });

  // -------------------------
  // Calendar
  // -------------------------
  const calendar = $('#calendarGrid');
  const activeDays = [13,14,15,16,17,18,19];
  const dotDays = [5,10,25,28];

  // Empty leading cells for July 2024 (starts Monday in this mock dashboard)
  for (let i = 1; i <= 31; i++) {
    let classes = 'day';
    if (activeDays.includes(i)) classes += ' active';
    if (dotDays.includes(i)) classes += ' dot';
    calendar.append(`<div class="${classes}">${i}</div>`);
  }

  // Fill final row to keep calendar shape
  const remainder = 35 - calendar.children().length;
  for (let i = 1; i <= remainder; i++) {
    calendar.append(`<div class="day muted-day">${i}</div>`);
  }

  // -------------------------
  // jQuery interactions
  // -------------------------
  $('.segmented').on('click', 'button', function () {
    const $button = $(this);
    const range = $button.data('range');

    $button.closest('.segmented').find('button').removeClass('selected');
    $button.addClass('selected');

    if ($button.parent().attr('id') === 'revenueFilter') {
      const data = {
        Today: [4.1, 4.0, 4.3, 4.2, 4.5, 4.4, 4.6, 4.5, 4.7],
        Week:  [3.0, 3.6, 3.2, 3.8, 3.7, 4.0, 3.9, 4.2, 4.4],
        Month: [3.2, 4.1, 3.4, 3.0, 3.7, 3.5, 3.9, 3.3, 3.8],
        Range: [2.9, 3.3, 3.1, 3.8, 3.5, 3.9, 3.6, 4.1, 4.5]
      };
      revenueChart.data.datasets[0].data = data[range];
      revenueChart.update();
    }

    if ($button.parent().attr('id') === 'installFilter') {
      const multiplier = { Today: .75, Week: 1, Month: 1.28, Range: .92 }[range];
      installsChart.data.datasets[0].data = [360,290,240,315,562,270,350].map(v => Math.round(v * multiplier));
      installsChart.data.datasets[1].data = [180,240,150,210,286,190,245].map(v => Math.round(v * multiplier));
      installsChart.update();
    }
  });

  $('.nav-pill').on('click', function () {
    $('.nav-pill').removeClass('active');
    $(this).addClass('active');

    const section = $(this).data('section');

    // Small UI response to make the navigation feel functional.
    if (section === 'analytics') {
      $('#revenueValue').text('84,921');
      $('#subscriptionValue').text('336');
    } else if (section === 'finance') {
      $('#revenueValue').text('92,430');
      $('#subscriptionValue').text('351');
    } else if (section === 'workouts') {
      $('#revenueValue').text('79,675');
      $('#subscriptionValue').text('312');
    } else {
      $('#revenueValue').text('79,675');
      $('#subscriptionValue').text('312');
    }
  });

  $('.icon-btn').on('click', function () {
    $(this).toggleClass('active-search');
    $(this).find('i').toggleClass('bi-search bi-x-lg');
  });

  $('#genderSelect').on('change', function () {
    const selected = $(this).val();
    if (selected === 'Female') {
      $('.workout-count').each(function (i) {
        $(this).text(['34k','29k','25k','21k'][i]);
      });
    } else if (selected === 'All') {
      $('.workout-count').each(function (i) {
        $(this).text(['41k','33k','29k','25k'][i]);
      });
    } else {
      $('.workout-count').each(function (i) {
        $(this).text(['39k','31k','27k','23k'][i]);
      });
    }
  });
});
