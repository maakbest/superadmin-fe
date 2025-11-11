// components
import Statistics from './components/Statistics'
import { PageBreadcrumb } from '../../../components'
import ReactApexChart from 'react-apexcharts'

// dummy data
import { spilineAreaApexOpts } from './data'

const Ecommerce = () => {
	return (
		<>
			<PageBreadcrumb title="Dashboard" subName="Menu" />
			<Statistics />

			<div className="grid lg:grid-cols-1 gap-6 mb-6">
				<div className="card">
					<div className="p-6">
						<h4 className="card-title mb-4">Users Verfied</h4>
						<div dir="ltr">
							<ReactApexChart className="apex-charts" options={spilineAreaApexOpts} height={380} series={spilineAreaApexOpts.series} type="area" />
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Ecommerce
