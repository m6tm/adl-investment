<link rel="stylesheet" href="{{ asset('assets/css/partials/header.css') }}">
<link rel="stylesheet" href="{{ asset('assets/css/utils.css') }}">

<header id="header" class="header fixed-top">
    <div class="topbar d-flex align-items-center">
        <div class="container d-flex justify-content-center justify-content-md-between">
            <div class="contact-info d-flex align-items-center">
                <i class="bi bi-envelope d-flex align-items-center">
                    <a href="mailto:adl.investment.55@gmail.com">adl.investment.55@gmail.com</a>
                </i>
                <a href="tel:+1 5589 55488 55">
                    <i class="bi bi-phone d-flex align-items-center ms-4"><span>+1 5589 55488 55</span></i>
                </a>
            </div>
            <div class="social-links d-none d-md-flex align-items-center">
                <a href="#" class="twitter"><i class="bi bi-twitter-x"></i></a>
                <a href="#" class="facebook"><i class="bi bi-facebook"></i></a>
                <a href="#" class="instagram"><i class="bi bi-instagram"></i></a>
                <a href="#" class="linkedin"><i class="bi bi-linkedin"></i></a>
            </div>
            <div class="social-links d-none d-md-flex align-items-center">
                <a href="{{ route('signin') }}">
                    <i class="bi bi-person-fill"></i>
                    <span>Sign In</span>
                </a>
                <a href="{{ route('signup') }}">
                    <i class="bi bi-pencil-square"></i>
                    <span>Sign Up</span>
                </a>
            </div>
        </div>
    </div><!-- End Top Bar -->

    <div class="branding d-flex align-items-cente">

        <div class="container position-relative d-flex align-items-center justify-content-between">
            <a href="{{ route('home') }}" class="logo d-flex align-items-center">
                <h1 class="sitename">ADL</h1>
                <span>.Investment</span>
            </a>

            <nav id="navmenu" class="navmenu">
                <ul>
                    <li><a href="{{ route('home') }}" class="active">Home<br></a></li>
                    <li><a href="{{ route('home') }}#services">Services</a></li>
                    <li><a href="{{ route('home') }}#contact">Contact</a></li>
                    <li><a href="{{ route('tutoriel') }}#tutoriel">Tutoriel</a></li>
                    <li><a href="{{ route('about') }}#aboutus">About Us</a></li>
                    <li><a href="{{ route('conditions') }}#condition">Terms</a></li>
                    <li><a href="{{ route('privacy') }}#privacy">Privacy Policy</a></li>
                    

                </ul>
                <i class="mobile-nav-toggle d-xl-none bi bi-list"></i>
            </nav>

        </div>

    </div>

</header>
