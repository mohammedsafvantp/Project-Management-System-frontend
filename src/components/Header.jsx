import React from 'react'

function Header() {
  return (
  <nav class="navbar navbar-expand-lg bg-light w-100">
    <div class="container">
        <a class="navbar-brand ms-5" href="/">PROJECT MANAGEMENT SYSTEM</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
    </div>
</nav>
  )
}

export default Header