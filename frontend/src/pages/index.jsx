// import Head from "next/head";
// import Image from "next/image";
// import { Inter } from "next/font/google";
// import styles from "@/styles/Home.module.css";
// import { useRouter } from "next/router";
// import UserLayout from "@/layout/UserLayout";


// const inter = Inter({
//   subsets: ["latin"],
// });

// export default function Home() {

//   const router = useRouter();
//   return (
//     <UserLayout>
//       <div className={styles.container}>

//         <div className={styles.mainContainer}>

//           <div className={styles.mainContainer_left}>
//           <p>Connect with friends without Exaggeration</p>

//           <p>A True social media platform with stories no blufs !</p>
          
//           <div onClick={()=>{
//             router.push("/login")
//           }}className={styles.buttonJoin}>
//             <p>Join Now</p>
//           </div>
          
//           </div>
          
//           <div className={styles.mainContainer_right}>
//             <img src="images/homemain_connection.jpg"/>
//           </div>
//         </div>
//       </div>
//     </UserLayout>
//   );
// }

import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import UserLayout from "@/layout/UserLayout";
import styles from "./Home.module.css";

const inter = Inter({
  subsets: ["latin"],
});

export default function Home() {
  const router = useRouter();

  return (
    <UserLayout>
      <Head>
        <title>ProConnect — Where professionals connect</title>
        <meta
          name="description"
          content="Join ProConnect, the professional network built for real connections, jobs, and growth."
        />
      </Head>

      <div className={styles.container}>
        {/* HERO */}
        <div className={styles.mainContainer}>
          <div className={styles.mainContainer_left}>
            <p className={styles.heroHeading}>
              Connect with friends without Exaggeration
            </p>

            <p className={styles.heroSubheading}>
              A True social media platform with stories no blufs !
            </p>

            <div className={styles.heroActions}>
              <div
                onClick={() => {
                  router.push("/login");
                }}
                className={styles.buttonJoin}
              >
                <p>Join Now</p>
              </div>

              <div
                onClick={() => {
                  router.push("/login");
                }}
                className={styles.buttonSignin}
              >
                <p>Sign in</p>
              </div>
            </div>

            <p className={styles.heroDisclaimer}>
              By clicking Continue, you agree to ProConnect's User Agreement,
              Privacy Policy, and Cookie Policy.
            </p>
          </div>

          <div className={styles.mainContainer_right}>
            <div className={styles.heroImageWrap}>
              <img
                src="images/homemain_connection.jpg"
                alt="People connecting on ProConnect"
              />

              <div className={styles.floatingCard1}>
                <span className={styles.floatingDot}></span>
                <p>500+ new connections today</p>
              </div>

              <div className={styles.floatingCard2}>
                <span className={styles.floatingIcon}>💼</span>
                <p>1,200+ jobs posted this week</p>
              </div>
            </div>
          </div>
        </div>

        {/* TRUST STRIP
        <div className={styles.trustStrip}>
          <p>Trusted by professionals from</p>
          <div className={styles.trustLogos}>
            <span>Infosys</span>
            <span>TCS</span>
            <span>Wipro</span>
            <span>Accenture</span>
            <span>Capgemini</span>
          </div>
        </div> */}

        {/* STATS BAR */}
        <div className={styles.statsSection}>
          <div className={styles.statItem}>
            <h3>12M+</h3>
            <p>Active members</p>
          </div>
          <div className={styles.statDivider}></div>
          <div className={styles.statItem}>
            <h3>3.5M+</h3>
            <p>Companies listed</p>
          </div>
          <div className={styles.statDivider}></div>
          <div className={styles.statItem}>
            <h3>800K+</h3>
            <p>Jobs posted monthly</p>
          </div>
          <div className={styles.statDivider}></div>
          <div className={styles.statItem}>
            <h3>50+</h3>
            <p>Industries covered</p>
          </div>
        </div>

{/* Feature Section */}
<div className={styles.featuresSection}>
  <h2 className={styles.sectionTitle}>Get started with ProConnect</h2>

  <div className={styles.featuresGrid}>
    {/* Card 1 */}
    <div className={styles.featureCard}>
      <div className={styles.featureIllustration}>
        <img
          src="/images/card1.png"
          alt="Connect"
          className={styles.featureImage}
        />
      </div>

      <h3>Connect with people who can help</h3>

      <div className={styles.featureCardButton}>
        <p>Find people you know</p>
      </div>
    </div>

    {/* Card 2 */}
    <div className={styles.featureCard}>
      <div className={styles.featureIllustration}>
        <img
          src="/images/card2.png"
          alt="Learn"
          className={styles.featureImage}
        />
      </div>

      <h3>Learn the skills you need to succeed</h3>

      <div className={styles.featureCardDropdown}>
        <p>Choose a topic to learn about</p>
        <span>▼</span>
      </div>
    </div>

    {/* Card 3 */}
    <div className={styles.featureCard}>
      <div className={styles.featureIllustration}>
        <img
          src="/images/card3.png"
          alt="Jobs"
          className={styles.featureImage}
        />
      </div>

      <h3>Find the right job for you</h3>

      <div className={styles.featureCardButton}>
        <p>Search jobs</p>
      </div>
    </div>

    {/* Card 4 */}
    <div className={styles.featureCard}>
      <div className={styles.featureIllustration}>
        <img
          src="/images/card4.png"
          alt="Feed"
          className={styles.featureImage}
        />
      </div>

      <h3>Stay updated with your network</h3>

      <div className={styles.featureCardButton}>
        <p>See your feed</p>
      </div>
    </div>
  </div>
</div>
        {/* FEATURE GRID
        <div className={styles.featuresSection}>
          <h2 className={styles.sectionTitle}>
            Explore what ProConnect can do for you
          </h2>
          <p className={styles.sectionSubtitle}>
            Everything you need to grow, connect, and get hired — in one place.
          </p>

          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <span className={styles.featureIcon}></span>
              <h3>Build your network</h3>
              <p>Connect with peers, mentors, and industry leaders in your field.</p>
            </div>

            <div className={styles.featureCard}>
              <span className={styles.featureIcon}></span>
              <h3>Find the right job</h3>
              <p>Discover roles matched to your skills and get noticed by recruiters.</p>
            </div>

            <div className={styles.featureCard}>
              <span className={styles.featureIcon}></span>
              <h3>Keep learning</h3>
              <p>Access curated resources and courses to grow your career.</p>
            </div>

            <div className={styles.featureCard}>
              <span className={styles.featureIcon}></span>
              <h3>Stay in the loop</h3>
              <p>Share updates, post stories, and message your connections instantly.</p>
            </div>
          </div>
        </div> */}

        {/* TESTIMONIALS */}
        {/* <div className={styles.testimonialsSection}>
          <h2 className={styles.sectionTitle}>What our members say</h2>

          <div className={styles.testimonialsGrid}>
            <div className={styles.testimonialCard}>
              <p className={styles.testimonialText}>
                "ProConnect helped me land my first job straight out of college.
                The network here actually responds."
              </p>
              <div className={styles.testimonialAuthor}>
                <div className={styles.testimonialAvatar}>A</div>
                <div>
                  <p className={styles.testimonialName}>Aakanksha R.</p>
                  <p className={styles.testimonialRole}>Software Engineer</p>
                </div>
              </div>
            </div>

            <div className={styles.testimonialCard}>
              <p className={styles.testimonialText}>
                "I've built genuine professional relationships here, not just
                empty connection counts."
              </p>
              <div className={styles.testimonialAuthor}>
                <div className={styles.testimonialAvatar}>R</div>
                <div>
                  <p className={styles.testimonialName}>Rahul M.</p>
                  <p className={styles.testimonialRole}>Product Manager</p>
                </div>
              </div>
            </div>

            <div className={styles.testimonialCard}>
              <p className={styles.testimonialText}>
                "The job recommendations are actually relevant. Found my current
                role within two weeks."
              </p>
              <div className={styles.testimonialAuthor}>
                <div className={styles.testimonialAvatar}>S</div>
                <div>
                  <p className={styles.testimonialName}>Sneha K.</p>
                  <p className={styles.testimonialRole}>UI/UX Designer</p>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        {/* APP DOWNLOAD SECTION
        <div className={styles.appSection}>
          <div className={styles.appSection_left}>
            <h2>Take ProConnect with you</h2>
            <p>
              Stay connected on the go. Get notified about new messages, job
              matches, and connection requests instantly.
            </p>
            <div className={styles.appButtons}>
              <div className={styles.appButton}>
                <span>▶</span>
                <div>
                  <small>Get it on</small>
                  <p>Google Play</p>
                </div>
              </div>
              <div className={styles.appButton}>
                <span></span>
                <div>
                  <small>Download on the</small>
                  <p>App Store</p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.appSection_right}>
            <div className={styles.appMockup}>
              <div className={styles.appMockupScreen}></div>
            </div>
          </div>
        </div> */}

        {/* CTA BANNER */}
        <div className={styles.ctaBanner}>
          <h2>Ready to grow your professional network?</h2>
          <p className={styles.ctaSubtext}>
            Join millions of professionals already building their future on ProConnect.
          </p>
          <div
            onClick={() => {
              router.push("/login");
            }}
            className={styles.ctaButton}
          >
            <p>Get started — it's free</p>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <div className={styles.footerTop}>
          <div className={styles.footerColumn}>
            <h4>General</h4>
            <ul>
              <li>Sign Up</li>
              <li>Help Center</li>
              <li>About</li>
              <li>Press</li>
              <li>Blog</li>
              <li>Careers</li>
            </ul>
          </div>

          <div className={styles.footerColumn}>
            <h4>Browse ProConnect</h4>
            <ul>
              <li>Jobs</li>
              <li>Learning</li>
              <li>People</li>
              <li>Groups</li>
              <li>Stories</li>
              <li>Events</li>
            </ul>
          </div>

          <div className={styles.footerColumn}>
            <h4>Business Solutions</h4>
            <ul>
              <li>Talent Solutions</li>
              <li>Marketing Solutions</li>
              <li>Sales Solutions</li>
              <li>Advertising</li>
              <li>Small Business</li>
            </ul>
          </div>

          <div className={styles.footerColumn}>
            <h4>Directories</h4>
            <ul>
              <li>Members</li>
              <li>Companies</li>
              <li>Skills</li>
              <li>Locations</li>
              <li>Learning Topics</li>
            </ul>
          </div>

          <div className={styles.footerColumn}>
            <h4>Stay connected</h4>
            <p className={styles.footerNewsletterText}>
              Get product updates and career tips in your inbox.
            </p>
            <div className={styles.footerNewsletter}>
              <input type="email" placeholder="Email address" />
              <button type="button">Subscribe</button>
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <div className={styles.footerBrand}>
            <span className={styles.footerLogo}>ProConnect</span>
            <span>© 2026</span>
          </div>

          <div className={styles.footerLinks}>
            <span>Privacy &amp; Terms</span>
            <span>Cookie Policy</span>
            <span>Copyright Policy</span>
            <span>Accessibility</span>
            <span>Ad Choices</span>
          </div>

          <div className={styles.footerLanguage}>
            <span>🌐 English</span>
          </div>
        </div>
      </footer>
    </UserLayout>
  );
}