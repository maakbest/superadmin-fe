import StatisticsWidget from './StatisticsWidget'

const Statistics = () => {
	return (
		<div className="grid 2xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 gap-6 mb-6">
			<div className="2xl:col-span-1 lg:col-span-2">
				<StatisticsWidget variant={'bg-success'} cardTitle={'Total Users'} title={'No of Users'} stats={'54,214'} classname={'apex-charts'} chartSeries={[58, 42]} colors={['#47ad77', '#e3e9ee']} />
			</div>

			<div className="2xl:col-span-1 lg:col-span-2">
				<StatisticsWidget variant={'bg-danger'} cardTitle={'Daily Active Users'} title={'No of Daily Active Users'} stats={'7,543'} classname={'apex-charts'} chartSeries={[34, 66]} colors={['#3e60d5', '#e3e9ee']} />
			</div>

			<div className="2xl:col-span-1 lg:col-span-2">
				<StatisticsWidget variant={'bg-danger'} cardTitle={'New Signups'} title={'No of New Signups'} stats={'9,254'} classname={'apex-charts'} chartSeries={[87, 13]} colors={['#16a7e9', '#e3e9ee']} />
			</div>
		</div>
	)
}

export default Statistics
