"use client";
import styles from "./page.module.css" ;

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.header_container}>
      <img src="./logo_everleaf.png" className={styles.header_image}/>
      <p className={styles.logo_text}>EverLeaf</p>
      </div>
      <nav className={styles.nav}>
      {/*Some links are disabled for now because there're no pages, that links should lead to*/}
        <a href="">Home</a>
        <a href="" className={styles.disabled}>Shop</a>
        <a href="" className={styles.disabled}>About</a>
      </nav>
      <div className={styles.header_container}>
      {/*if we will need this, so you can uncomment this input. I just thought, that it has no sense to have search bar on the header, when we have it on the main page in main section */}
      {/* <input type="text" placeholder="Search for plants..." className={styles.header_search}/> */}
      {/* it's disabled for now because we don't have a login page*/}
      <a href=""><button className={styles.login_button} disabled>Login</button></a>
      {/*it's also disabled for now because we don't have a profile page*/}
      <a href="" className={styles.disabled}><img src="./user_icon.png" className={styles.header_image}/></a>
      </div>
    </header>
  );
}
