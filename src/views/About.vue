<template>
  <div class="wrapper">
    <div class="about">
      <div class="about-text">
        <h1>What are we about</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Est quibusdam fugiat officiis,
          voluptas explicabo corrupti exercitationem asperiores perspiciatis eligendi eaque
          accusamus ratione doloremque dignissimos, animi quis pariatur nesciunt omnis aspernatur.
        </p>
      </div>
      <img src="../assets/map.jpg" alt="about" />
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
}

/* Use grid to avoid media queries */
.about {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  width: 70%;
  max-width: 100%;
  padding-top: 10rem;
  overflow: hidden;
  text-align: center;
  align-items: center;
}
.about-text h1 {
  font-size: 4rem;
  font-weight: 600;
}

.about img {
  width: 100%;
  height: auto;
  object-fit: cover;
}
</style>
