import './Tasks.css';
import Header from '../components/Header';
import Button from '../components/Button';
import ButtonList from '../components/ButtonList';
import Logo from '../assets/TimeFit_Logo.png';
import { useNavigate } from 'react-router-dom';
import {
  overview,
  pathConventions,
  phases,
  dependencies,
  strategy,
} from '../data/taskData';

const TaskRow = ({ task }) => {
  return (
    <li className="TaskRow">
      <div className="TaskRow__meta">
        <span className="pill pill--id">{task.id}</span>
        {task.parallel && <span className="pill pill--parallel">P</span>}
        {task.story && <span className="pill pill--story">{task.story}</span>}
        {task.priority && (
          <span className="pill pill--priority">{task.priority}</span>
        )}
      </div>
      <div className="TaskRow__content">
        <div className="TaskRow__desc">{task.description}</div>
        {task.path && <div className="TaskRow__path">{task.path}</div>}
      </div>
    </li>
  );
};

const Tasks = () => {
  const nav = useNavigate();
  const navItems = [
    { label: '홈', onClick: () => nav('/'), type: 'Plain' },
    { label: '태스크 보드', onClick: () => nav('/tasks'), type: 'Plain' },
    { label: '일자리 찾기', onClick: () => nav('/find'), type: 'Plain' },
  ];

  return (
    <div className="TasksPage">
      <Header
        centerChild={<ButtonList items={navItems} />}
        leftChild={
          <Button
            text={'TimeFit'}
            icon={<img src={Logo} width={60} />}
            onClick={() => nav('/')}
            type={'Logo'}
          />
        }
        rightChild={
          <Button text={'로그인'} type={'Login'} onClick={() => nav('/login')} />
        }
      />

      <main className="TasksPage__body">
        <section className="TasksPage__hero">
          <div className="TasksPage__badgeRow">
            <span className="pill pill--accent">구직자 및 채용자 서비스</span>
            <span className="pill">Frontend</span>
          </div>
          <h1 className="TasksPage__title">작업 보드</h1>
          <p className="TasksPage__subtitle">{overview.description}</p>
          <div className="TasksPage__grid">
            <div className="card">
              <h3>Input</h3>
              <p>{overview.input}</p>
            </div>
            <div className="card">
              <h3>Prerequisites</h3>
              <div className="chip-list">
                {overview.prerequisites.map((item) => (
                  <span key={item} className="chip">
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="card">
              <h3>Tests</h3>
              <p>{overview.tests}</p>
            </div>
            <div className="card">
              <h3>Organization</h3>
              <p>{overview.organization}</p>
            </div>
            <div className="card">
              <h3>Path Conventions</h3>
              <p>Web app: {pathConventions.webApp}</p>
              <p>Tests: {pathConventions.tests}</p>
            </div>
          </div>
        </section>

        <section className="TasksPage__phases">
          {phases.map((phase) => (
            <div key={phase.id} className="phase-card">
              <div className="phase-card__header">
                <div className="phase-card__title">
                  {phase.title}
                  {phase.priority && (
                    <span className="pill pill--priority">{phase.priority}</span>
                  )}
                </div>
                {phase.purpose && (
                  <p className="phase-card__purpose">{phase.purpose}</p>
                )}
                {phase.goal && <p className="phase-card__goal">Goal: {phase.goal}</p>}
              </div>

              {phase.tests && phase.tests.length > 0 && (
                <div className="phase-card__tests">
                  <div className="phase-card__subheading">Tests (optional)</div>
                  <ul className="TaskList">
                    {phase.tests.map((task) => (
                      <TaskRow key={task.id} task={{ ...task, priority: task.priority || 'Test' }} />
                    ))}
                  </ul>
                </div>
              )}

              <ul className="TaskList">
                {phase.tasks.map((task) => (
                  <TaskRow key={task.id} task={task} />
                ))}
              </ul>

              {phase.checkpoint && (
                <div className="phase-card__checkpoint">{phase.checkpoint}</div>
              )}
            </div>
          ))}
        </section>

        <section className="TasksPage__dependencies">
          <div className="card">
            <h3>Phase Dependencies</h3>
            <ul>
              {dependencies.phaseDependencies.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="card">
            <h3>Within Each User Story</h3>
            <ul>
              {dependencies.withinStory.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="card">
            <h3>Parallel Opportunities</h3>
            <ul>
              {dependencies.parallelOpportunities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="TasksPage__strategy">
          <div className="card">
            <h3>MVP First (User Story 1, 2, 4)</h3>
            <ol>
              {strategy.mvpFirst.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>
          <div className="card">
            <h3>Incremental Delivery</h3>
            <ol>
              {strategy.incrementalDelivery.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>
          <div className="card">
            <h3>Parallel Team Strategy</h3>
            <ol>
              {strategy.parallelTeam.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>
          <div className="card">
            <h3>Notes</h3>
            <ul>
              {strategy.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Tasks;


