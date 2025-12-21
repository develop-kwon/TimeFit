import { useState, useEffect, useCallback, useRef } from 'react';
import MainLayout from '../layouts/MainLayout';
import { JobCard } from '../components/jobs/JobCard';
import { getJobPostings, getSchedules, matchSchedule } from '../services/jobService';
import { useAuth } from '../context/AuthContext';
import { useErrorHandler } from '../components/ErrorDisplay';
import { JobCategories } from '../types/auth';
import './Find.css';

const Find = () => {
  const { isAuthenticated, user } = useAuth();
  const { setError } = useErrorHandler();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [schedules, setSchedules] = useState([]);
  
  // 검색 및 필터 상태
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  
  // 일정 매칭 결과 (jobId -> matchResult)
  const [scheduleMatches, setScheduleMatches] = useState({});

  // setError를 ref로 저장하여 의존성 문제 해결
  const setErrorRef = useRef(setError);
  useEffect(() => {
    setErrorRef.current = setError;
  }, [setError]);

  // 일자리 목록 로드 함수
  const loadJobs = useCallback(async () => {
    setLoading(true);
    try {
      const filters = {};
      if (searchQuery) filters.q = searchQuery;
      if (selectedCategory) filters.category = selectedCategory;
      if (selectedLocation) filters.location = selectedLocation;

      const jobList = await getJobPostings(filters);
      setJobs(jobList || []);
    } catch (error) {
      console.error('일자리 로드 오류:', error);
      setErrorRef.current?.(error);
      // 에러 발생 시 빈 배열로 설정하여 무한 루프 방지
      setJobs([]);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, selectedCategory, selectedLocation]);

  // 일자리 목록 로드
  useEffect(() => {
    loadJobs();
  }, [loadJobs]);

  // 일정 로드 함수
  const loadSchedules = useCallback(async () => {
    try {
      const scheduleList = await getSchedules();
      setSchedules(scheduleList || []);
    } catch (error) {
      // 일정 로드 실패는 에러로 표시하지 않음 (일정이 없을 수도 있음)
      console.warn('일정을 불러올 수 없습니다:', error);
      setSchedules([]);
    }
  }, []);

  // 구직자일 경우 일정 로드
  useEffect(() => {
    if (isAuthenticated && user?.role === 'JOB_SEEKER') {
      loadSchedules();
    } else {
      // 구직자가 아니면 일정 초기화
      setSchedules([]);
    }
  }, [isAuthenticated, user, loadSchedules]);

  // 일정이 로드되면 매칭 수행
  useEffect(() => {
    if (jobs.length === 0) {
      setScheduleMatches({});
      return;
    }

    if (schedules.length > 0) {
      const matches = {};
      jobs.forEach(job => {
        matches[job.id] = matchSchedule(job, schedules);
      });
      setScheduleMatches(matches);
    } else {
      // 일정이 없으면 모든 일자리에 일정 없음 메시지 표시
      const matches = {};
      jobs.forEach(job => {
        matches[job.id] = {
          hasSchedule: false,
          matches: [],
          message: '등록된 일정이 없습니다. 마이페이지에서 일정을 등록해주세요.',
        };
      });
      setScheduleMatches(matches);
    }
  }, [schedules, jobs]);

  const handleSearch = (e) => {
    e.preventDefault();
    loadJobs();
  };

  const handleApplySuccess = (job) => {
    // 지원 성공 시 일정 매칭 다시 계산
    if (schedules.length > 0) {
      const matchResult = matchSchedule(job, schedules);
      setScheduleMatches(prev => ({
        ...prev,
        [job.id]: matchResult,
      }));
    }
  };

  const handleApplyError = (error) => {
    setError(error);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedLocation('');
  };

    return (
    <MainLayout>
      <div className="Find">
        <div className="Find__container">
          {/* 검색 및 필터 섹션 */}
          <div className="Find__search-section">
            <h1 className="Find__title">일자리 찾기</h1>
            {/* 검색 바 */}
            <form onSubmit={handleSearch} className="Find__search-form">
              <div className="Find__search-input-wrapper">
                <input
                  type="text"
                  className="Find__search-input"
                  placeholder="일자리 제목 또는 회사명으로 검색..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="Find__search-button">
                  검색
                </button>
              </div>
            </form>

            {/* 필터 */}
            <div className="Find__filters">
              <div className="Find__filter-group">
                <label className="Find__filter-label">직종</label>
                <select
                  className="Find__filter-select"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">전체</option>
                  {JobCategories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="Find__filter-group">
                <label className="Find__filter-label">지역</label>
                <select
                  className="Find__filter-select"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                >
                  <option value="">전체</option>
                  <option value="정왕동">정왕동</option>
                  <option value="은행동">은행동</option>
                  <option value="대야동">대야동</option>
                  <option value="신천동">신천동</option>
                  <option value="신현동">신현동</option>
                  <option value="매화동">매화동</option>
                  <option value="목감동">목감동</option>
                  <option value="군자동">군자동</option>
                  <option value="과림동">과림동</option>
                  <option value="연성동">연성동</option>
                  <option value="능곡동">능곡동</option>
                  <option value="월곶동">월곶동</option>
                  <option value="장곡동">장곡동</option>
                  <option value="거북섬동">거북섬동</option>
                  <option value="배곧동">배곧동</option>
                </select>
              </div>

              <button
                type="button"
                onClick={clearFilters}
                className="Find__clear-filters"
              >
                필터 초기화
              </button>
            </div>
          </div>

          {/* 일정 매칭 안내 메시지 */}
          {isAuthenticated && user?.role === 'JOB_SEEKER' && schedules.length === 0 && (
            <div className="Find__schedule-notice">
              <span className="Find__schedule-notice-icon">ℹ️</span>
              <span className="Find__schedule-notice-text">
                일정 매칭을 위해 마이페이지에서 일정을 등록해주세요.
              </span>
            </div>
          )}

          {/* 일자리 목록 */}
          <div className="Find__jobs-section">
            {loading ? (
              <div className="Find__loading">일자리를 불러오는 중...</div>
            ) : jobs.length === 0 ? (
              <div className="Find__empty">
                <p>검색 결과가 없습니다.</p>
                <p>다른 검색어나 필터를 시도해보세요.</p>
              </div>
            ) : (
              <>
                <div className="Find__results-count">
                  총 {jobs.length}개의 일자리가 있습니다.
                </div>
                <div className="Find__jobs-list">
                  {jobs.map(job => (
                    <JobCard
                      key={job.id}
                      job={job}
                      scheduleMatch={scheduleMatches[job.id]}
                      onApplySuccess={handleApplySuccess}
                      onApplyError={handleApplyError}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
    );
};

export default Find;
