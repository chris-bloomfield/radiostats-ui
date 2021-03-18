import React, { ReactElement } from 'react'

const aboutPage = (): ReactElement => (
  <div className="outer">
    <h1>About</h1>
    <hr />

    <h2>What?</h2>
    <p>
      Radio Stats is a small project built to try and present RAJAR&apos;s radio listening data in a
      way that tries to give some context to the results.
    </p>
    <h2>Why?</h2>
    <p>
      Typically when a new set of listening figures are released each quarter it&apos;s customary
      for the media to focus on which stations&apos; listeners are up and which are down that
      quarter, but this misses the bigger picture which happens over a number of years. Looking at
      listening figures over a longer period can make it easier to tell the difference between
      seasonal changes and longer-term trends in listener numbers.
    </p>
    <p>
      This can be difficult to spot with RAJAR&apos;s publicly available data since it&apos;s
      separated by quarterly results rather than by station. For instance if you wanted to look at
      the last 10 years&apos; results for a particular station, you would have to download 40
      separate result sets and collate them. Which is essentially what this website does.
    </p>
    <p>
      Radio Stats contains every set of quarterly public data released by RAJAR released between
      2008 and 2020 (when they stopped doing field research due to the pandemic) presented
      individually by station. At the moment the site is fairly rudimentary but I hope to add more
      features in future.
    </p>
    <h2>How?</h2>
    <p>Radio Stats is actually two projects:</p>
    <ul>
      <li>
        A node app that pulls data from RAJAR&apos;s CSV exports, transforms it to a more usable
        data structure (with data split into stations, result sets, and name changes), and uploads
        it into MongoDB Atlas.
      </li>
      <li>
        A Next.js front-end (this website) that pulls GraphQL data from Atlas and serves it as a
        static site.
      </li>
    </ul>
    <p>
      The RAJAR data is stored as set of &apos;result&apos; documents (one per station per quarter),
      plus a separate set of &apos;station&apos; documents that each relate to a set of results. In
      addition, because radio stations like to change their names there is also a third
      &apos;nameChange&apos; document type that can be joined to a station each time its name
      changes.
    </p>
    <h2>Who?</h2>
    <p>
      Chris Bloomfield -{' '}
      <a href="https://github.com/chris-bloomfield" target="_blank" rel="noreferrer">
        Github
      </a>{' '}
      |{' '}
      <a href="https://www.linkedin.com/in/cbloomfield/" target="_blank" rel="noreferrer">
        LinkedIn
      </a>
    </p>
    <style jsx>{`
      .outer {
        margin: 32px auto;
        max-width: 960px;
      }

      h1 {
        margin: 0;
        display: inline-block;
        border-bottom: 8px solid #333;
        max-width: 75%;
        line-height: 64px;
        padding: 12px 0;
      }

      h2 {
        font-size: 16px;
      }

      hr {
        border: none;
        margin: 0;
        border-top: 1px solid #333;
        padding-bottom: 8px;
      }
    `}</style>
  </div>
)

export default aboutPage
