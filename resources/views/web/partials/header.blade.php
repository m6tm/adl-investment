<link rel="stylesheet" href="{{ asset('assets/css/partials/header.css') }}">

<header id="header" class="header fixed-top">
  <div class="topbar d-flex align-items-center">
    <div class="container d-flex justify-content-center justify-content-md-between">
      <div class="contact-info d-flex align-items-center">
        <i class="bi bi-envelope d-flex align-items-center"><a href="mailto:contact@example.com">adl.investment.55@gmail.com</a></i>
        <i class="bi bi-phone d-flex align-items-center ms-4"><span>+1 5589 55488 55</span></i>
      </div>
      <div class="social-links d-none d-md-flex align-items-center">
        <a href="#" class="twitter"><i class="bi bi-twitter-x"></i></a>
        <a href="#" class="facebook"><i class="bi bi-facebook"></i></a>
        <a href="#" class="instagram"><i class="bi bi-instagram"></i></a>
        <a href="#" class="linkedin"><i class="bi bi-linkedin"></i></a>
      </div>
    </div>
  </div><!-- End Top Bar -->

  <div class="branding d-flex align-items-cente">

    <div class="container position-relative d-flex align-items-center justify-content-between">
      <a href="index.html" class="logo d-flex align-items-center">
        <h1 class="sitename">ADL</h1>
        <span>.</span>
      </a>

      <nav id="navmenu" class="navmenu">
        <ul>
          <li><a href="{{ route('load.page', 'home') }}" class="active">Home<br></a></li>

          <li><a href="#portfolio">Portfolio</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="{{ route('load.page', 'team') }}">Team</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><a href="{{ route('load.page', 'tutoriel') }}">Tutoriel</a></li>
          <li class="nav-item dropdown"><a class="nav-link dropdown-toggle" href="#about"  data-bs-toggle="" aria-expanded="false">About</a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="{{ route('load.page', 'about') }}">About Us</a></li>
              <li><a class="dropdown-item" href="{{ route('load.page', 'conditions') }}">Condition Term</a></li>
            </ul>
          </li>

        </ul>
        <i class="mobile-nav-toggle d-xl-none bi bi-list"></i>
      </nav>

    </div>

  </div>

</header>
