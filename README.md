 # Fitonist Analytics Dashboard

 A responsive fitness analytics dashboard built with HTML, CSS, Bootstrap, jQuery, and Chart.js.

 # https://fitonist-dashboard.vercel.app/

 ## Project Files

 - `index.html` - Dashboard structure and CDN dependency links.
 - `style.css` - Custom dashboard theme, layout, panels, and responsive styling.
 - `script.js` - Chart setup, calendar generation, and jQuery interactions.

 ## Run the Project

 This is a static frontend project. No build step or package installation is required.

 1. Open `index.html` directly in a browser, or run it with a local static server such as VS Code Live Server.
 2. Keep an internet connection available because the libraries and font are loaded from CDNs.

 ## Bootstrap Usage

 > **Bootstrap is included in `index.html` in the following locations:**
 >
 > **1. Bootstrap CSS**
 >
 > The Bootstrap 5.3.3 stylesheet is loaded in the `<head>` and is available globally:
 >
 > ```html
 > <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
 > ```
 >
 > **2. Bootstrap Icons**
 >
 > Bootstrap Icons 1.11.3 is loaded in the `<head>`. Its icon classes are used on dashboard controls, including:
 >
 > - Search: `<i class="bi bi-search"></i>`
 > - Dropdown chevron: `<i class="bi bi-chevron-down"></i>`
 > - External action: `<i class="bi bi-arrow-up-right"></i>`
 > - Apple and Google Play platform icons
 > - Bar chart and pie chart icons
 >
 > **3. Bootstrap JavaScript bundle**
 >
 > The Bootstrap bundle is loaded before the project script at the bottom of `index.html`:
 >
 > ```html
 > <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
 > ```

 ### Bootstrap and Custom CSS

 Bootstrap is available for the page, but the current dashboard grid, cards, navigation pills, colors, charts, and responsive breakpoints are implemented in `style.css`. The Bootstrap bundle is loaded for Bootstrap component support, although this page currently handles its interactions with jQuery instead of Bootstrap data attributes.

 ## jQuery Usage

 jQuery 3.7.1 is loaded before `script.js`:

 ```html
 <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
 ```

 `script.js` uses jQuery to:

 - Wait for the DOM with `$(function () { ... })`.
 - Generate calendar days with `$('#calendarGrid').append(...)`.
 - Handle revenue and install filter buttons.
 - Switch active navigation pills with `.addClass()` and `.removeClass()`.
 - Toggle the search icon with `.toggleClass()`.
 - Update workout counts when the gender selector changes.
 - Update visible dashboard values with `.text()`.

 ## Chart.js Usage

 Chart.js is loaded from a CDN and creates the revenue line chart, installs bar chart, and age-range doughnut chart. jQuery updates chart data and calls `.update()` when the dashboard filters change.

 ## Notes

 - The dashboard uses mock data and does not connect to a backend API.
 - The calendar displays July 2024 as sample data.
