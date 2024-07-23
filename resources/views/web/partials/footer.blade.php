<link rel="stylesheet" href="{{ asset('assets/css/partials/footer.css') }}">

<div class="container footer-top">
    <div class="row gy-4">
      <div class="col-lg-5 col-md-12 footer-about">
        <a href="index.html" class="logo d-flex align-items-center">
          <span class="sitename">ADL</span>
        </a>
        <p>Plongez dans l'univers excitant du jeu en ligne ADL et tentez votre chance avec notre système de tirage de roue unique!</p>
        <div class="social-links d-flex mt-4">
          <a href=""><i class="bi bi-twitter-x"></i></a>
          <a href=""><i class="bi bi-facebook"></i></a>
          <a href=""><i class="bi bi-instagram"></i></a>
          <a href=""><i class="bi bi-linkedin"></i></a>
        </div>
      </div>

      <div class="col-lg-2 col-6 footer-links">
        <h4>Liens utiles</h4>
        <ul>
          <li><a href="#">Home</a></li>
					<li><a href="{{ route('about') }}#aboutus">About Us</a></li>
					<li><a href="{{ route('tutoriel') }}#tutoriel">Tutoriel</a></li>
          <li><a href="{{ route('conditions') }}">Terms of service</a></li>
          <li><a href="{{ route('privacy') }}">Privacy policy</a></li>
        </ul>
      </div>

      <div class="col-lg-3 col-md-12 footer-contact text-center text-md-start">
        <h4>Contact Us</h4>
        <p>Quartier:</p>
        <p>Ville:</p>
        <p>Pays:</p>
        <p class="mt-4"><strong>Phone:</strong> <span>+1 5589 55488 55</span></p>
        <p><strong>Email:</strong> <span>adl.investment.55@gmail.com</span></p>
      </div>

    </div>
  </div>

  <div class="container copyright text-center mt-4">
    <p>© <span>Copyright</span> <strong class="px-1 sitename">ADL 2024</strong> <span>All Rights Reserved</span></p>
    <div class="credits">
      Designed by <a href="#">DevGroup</a>
    </div>
  </div>
