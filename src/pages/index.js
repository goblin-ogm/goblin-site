import React, { useState } from 'react'
import classnames from 'classnames'
import Layout from '@theme/Layout'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import useBaseUrl from '@docusaurus/useBaseUrl'
import styles from './styles.module.css'
import CustomCodeBlock from '../components/CustomCodeBlock'
import GithubCard from '../components/GithubCard'
import { repos } from '../data/github'

const simpleExample = `
from goblin import Goblin, element, properties

# Object representing a Person vertex
class Person(element.Vertex):
    __label__ = 'person'
    name = properties.Property(properties.String)
    age = properties.Property(properties.Integer)

# Create a database session
app = Goblin.open(
            event_loop,
            hosts=['localhost'],
            port=8182)
session = await app.session()

# create an Object to represent Jon
jon = Person()
jon.name = 'jonathan'
jon.age = 38

# Create the Vertex for Jon in the DB
session.save(jon)

# Close the connection
await app.close()
`.trim()
const glvExample=`
from goblin import DriverRemoteConnection  # alias for aiogremlin.DriverRemoteConnection
from goblin import Graph  # alias for aiogremlin.Graph

async def go(loop):
    remote_connection = await DriverRemoteConnection.open(
        'http://localhost:8182/gremlin', 'g')
    g = Graph().traversal().withRemote(remote_connection)
    vertices = await g.V().toList()
    await remote_connection.close()
    return vertices
`.trim()
const defaultsCardExample=`
from gremlin_python.process.traversal import Cardinality

class Person(goblin.Vertex):
    name = goblin.Property(goblin.String, default='John Doe')
    nicknames = goblin.VertexProperty(
        goblin.String, card=Cardinality.list_)

david = Person()
david.nicknames = ['Jeff', 'Freemo']
`.trim()
const metaExample=`
class HistoricalName(goblin.VertexProperty):
    notes = goblin.Property(goblin.String)

class City(goblin.Vertex):
    name = goblin.Property(goblin.String)
    population = goblin.Property(goblin.Integer)
    historical_name = HistoricalName(
        goblin.String, card=Cardinality.list_)

montreal = City()
montreal.historical_name = ['Ville-Marie']
montreal.historical_name('Ville-Marie').notes = 'Changed in 1705'
`.trim()
const optimisticExample=`
import goblin
from goblin.element import ImmutableMode, LockingMode

class Person(goblin.Vertex):
    def __init__(self):
            return super().__init__()
        self.__locking__ = LockingMode.OPTIMISTIC_LOCKING

    name = goblin.Property(goblin.String)

name = "Jeffrey Phillips Freeman"
jeff = Person()
jeff.name = name
session.add(jeff)

#Make sure no one with the same name exists
conflicts_query = (__.
                   V().
                   hasLabel(Person.__label__).
                   has("name", name).
                   hasNot('dirty').
                   count().
                   is_(0))

# Write to the database locking succeeds
await session.flush(conflicts_query)

`.trim()





const features = [
  {
    title: <>GraphDB OGM</>,
    imageUrl: '',
    description: <>Build Graph Database applications faster with less code</>,
    href: '/docs/guides/examples',
  },
  {
    title: <>Asynchronous IO</>,
    imageUrl: '',
      description: <>Native Python support for asynchronous programing including coroutines, iterators, and context managers as specified in PEP 492</>,
    href: '/docs/guides/examples',
  },
  {
      title: <>Gremlin Language Varient (GLV)</>,
    imageUrl: '',
    description: <>Run gremlin traversals directly in Python</>,
    href: '/docs/guides/examples',
  },
  {
    title: <>Enforce Immutability</>,
    imageUrl: '',
    description: <>Configure Vertex and Edges to be immutable after creation</>,
    href: '/docs/guides/examples',
  },
  {
    title: <>Property Cardinality</>,
    imageUrl: '',
    description: <>Properties can be singular objects or sets and lists.</>,
    href: '/docs/guides/examples',
  },
  {
    title: <>Metaproperties</>,
    imageUrl: '',
      description: <>Associate metadata with properties.</>,
    href: '/docs/guides/examples',
  },
]

function Feature({ imageUrl, title, description, href }) {
  const imgUrl = useBaseUrl(imageUrl)
  return (
    <div className={classnames('col col--4 m-b-md', styles.feature)}>
      <Link className={classnames('card', styles.featureCard)} to={href}>
        <div className="card__body">
          {imgUrl && (
            <div className="">
              <img className={styles.featureImage} src={imgUrl} alt={title} />
            </div>
          )}
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </Link>
    </div>
  )
}

function Home() {
  const context = useDocusaurusContext()
  const { siteConfig = {} } = context
  const [visibleCodeExample, showCodeExample] = useState('DEFAULTSCARD')
  return (
    <Layout title={`${siteConfig.title}`} description={siteConfig.tagline}>
      <main className="HomePage">
        {/* HEARDER */}
        <header className={classnames('hero', styles.heroBanner)}>
          <div className="container">
            <div className="row">
              <div className="col col--5">
                <h2 className="hero__title">{siteConfig.tagline}</h2>
                <p className="hero__subtitle">
                  Goblin adds a powerful OGM on top of Tinkerpop 3.
                </p>
                <div>
                  <Link
                    className={classnames(
                      'button hero--button button--md button--secondary button--outline responsive-button',
                      styles.button
                    )}
                    to={useBaseUrl('docs/about')}
                    style={{ marginLeft: 0, marginTop: 10 }}
                  >
                    Learn More
                  </Link>
                  <Link
                    className={classnames(
                      'button hero--button button--md button--primary responsive-button',
                      styles.button
                    )}
                    to={'https://git.qoto.org/goblin-ogm/goblin'}
                    style={{ marginTop: 10 }}
                  >
                    Follow our GitLab →
                  </Link>
                </div>
              </div>
              <div className="col col--7">
                <CustomCodeBlock
                  header="Adding a Vertex"
                  js={simpleExample}
                />
              </div>
            </div>
          </div>
        </header>

        <section
          style={{
            padding: '50px 0',
          }}
          className="hero is--dark"
        >
          <div className="container text--center">{/* <small>CUSTOMER LOGOS</small> */}</div>
        </section>

        {/* For Devs */}
        <section className={styles.forDevelopers}>
          <div className="container">
            <div className={classnames('row', styles.responsiveCentered)}>
              <div className="col col--6 col--offset-3">
                <h2 className="with-underline">For Developers</h2>
                <p className="">
                  We introspect your Goblin models and generate gremlin) traversals
                  so you can stop building repetitive CRUD APIs and focus on building your products.
                </p>
              </div>
            </div>
            <div className="ForDevelopers">
              <div className="row">
                <div className="ButtonTabs col col--3">
                  <div>
                    <button
                      className={`button button--${
                        visibleCodeExample === 'DEFAULTSCARD' ? 'info is-active' : 'info'
                      }`}
                      onClick={() => showCodeExample('DEFAULTSCARD')}
                    >
                      Defaults and cardinality
                    </button>
                    <button
                      className={`button button--${
                        visibleCodeExample === 'GLV' ? 'info is-active' : 'info '
                      }`}
                      onClick={() => showCodeExample('GLV')}
                    >
                      Python Gremlin Language Varient
                    </button>
                    <button
                      className={`button button--${
                        visibleCodeExample === 'META' ? 'info is-active' : 'info '
                      }`}
                      onClick={() => showCodeExample('META')}
                    >
                      Metaproperties
                    </button>
                    <button
                      className={`button button--${
                        visibleCodeExample === 'OPTIMISTIC' ? 'info is-active' : 'info '
                      }`}
                      onClick={() => showCodeExample('OPTIMISTIC')}
                    >
                      Optimistic creation locking
                    </button>
                  </div>
                </div>
                <div className="col col--9 code-with-header">
                  {visibleCodeExample === 'DEFAULTSCARD' && (
                    <CustomCodeBlock
                      header="Set property defaults and cardinality."
                      js={defaultsCardExample}
                    />
                  )}
                  {visibleCodeExample === 'GLV' && (
                    <CustomCodeBlock
                      header="Write Gremlin traversals in native Python."
                      js={glvExample}
                    />
                  )}
                  {visibleCodeExample === 'META' && (
                    <CustomCodeBlock header="Leverage metaproperties" js={metaExample} />
                  )}
                  {visibleCodeExample === 'OPTIMISTIC' && (
                    <CustomCodeBlock header="Garuntee integrity with optimistic locking" js={optimisticExample} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className={'section-lg'}>
          <div className="container">
            <h2 className="with-underline">Features</h2>
            <div className="row is-multiline">
              {features.map((props, idx) => (
                <Feature key={idx} {...props} />
              ))}
            </div>
          </div>
        </section>

        {/* OSS */}
        <section className={'section-lg'}>
          <div className="container">
            <div className={classnames('row', styles.responsiveCentered)}>
              <div className="col col--6 col--offset-3">
                <h2 className="with-underline">Open source</h2>
                <p className="">
                  Follow us on <a href="https://git.qoto.org/goblin-ogm/goblin">QOTO GitLab</a>.{' '}
                  <strong>Watch</strong> the releases of each repo to stay up to date on new features.
                </p>
              </div>
            </div>

            <div className="row">
              {repos.map((props, idx) => (
                <div className={'col'}>
                  <GithubCard
                    key={idx}
                    title={props.name}
                    description={props.description}
                    href={props.html_url}
                    stars={props.stargazers_count}
                    handle={props.full_name}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          style={{
            marginTop: 100,
            padding: '50px 0',
            borderTop: '1px solid var(--custom-border-color)',
          }}
          className="hero is--dark"
        >
          <div className="container text--center">
            {/* <div>
              <h2>Get Early Access</h2>
            </div> */}
            <div className="">
              <Link
                className={classnames(
                  'button hero--button button--outline button--md button--secondary responsive-button',
                  styles.button
                )}
                style={{ margin: 5 }}
                to={useBaseUrl('docs/about')}
              >
                Learn More
              </Link>
              <Link
                className={classnames(
                  'button hero--button button--md button--primary responsive-button',
                  styles.button
                )}
                to={'https://git.qoto.org/goblin-ogm/goblin'}
                style={{ margin: 5 }}
              >
                Follow our GitLab →
              </Link>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  )
}

export default Home
