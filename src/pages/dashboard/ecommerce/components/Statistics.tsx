import { useSelector } from 'react-redux'
import StatisticsWidget from './StatisticsWidget'

const Statistics = () => {
	const { newSignUsersNotOnboarding, dailyActiveUsers, registeredUsers, newSignUsers } = useSelector((state: any) => state.Dashboard)

	return (
		<div className="grid 2xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-2 gap-6 mb-6">
			<div className="2xl:col-span-1 lg:col-span-1">
				<StatisticsWidget variant={'bg-success'} cardTitle={'Total Users'} title={'No of Users'} stats={registeredUsers} classname={'apex-charts'} chartSeries={[registeredUsers, 0]} colors={['#47ad77', '#e3e9ee']} />
			</div>

			<div className="2xl:col-span-1 lg:col-span-1">
				<StatisticsWidget variant={'bg-danger'} cardTitle={'Daily Active Users'} title={'No of Daily Active Users'} stats={dailyActiveUsers} classname={'apex-charts'} chartSeries={[dailyActiveUsers, registeredUsers]} colors={['#3e60d5', '#e3e9ee']} />
			</div>

			<div className="2xl:col-span-1 lg:col-span-1">
				<StatisticsWidget variant={'bg-danger'} cardTitle={'New Signups'} title={'No of New Signups'} stats={newSignUsers?.length || 0} classname={'apex-charts'} chartSeries={[registeredUsers, newSignUsers?.length || 0]} colors={['#16a7e9', '#e3e9ee']} />
			</div>

			<div className="2xl:col-span-1 lg:col-span-1">
				<StatisticsWidget variant={'bg-danger'} cardTitle={'New Signups Not On Boarded'} title={'No of New Signups'} stats={newSignUsersNotOnboarding?.length || 0} classname={'apex-charts'} chartSeries={[newSignUsers?.length || 0, newSignUsersNotOnboarding?.length || 0]} colors={['#16a7e9', '#e3e9ee']} />
			</div>
		</div>
	)
}

export default Statistics
