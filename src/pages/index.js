import React, { useEffect, useState, useContext } from "react";
import { CrowdFundingContext } from "@/context/CrowdFunding";
import { Hero, Card, PopUp } from "../components/index";

const index = () => {
	const {
		titleData,
		getCampaigns,
		createCampaign,
		donate,
		getUserCampaigns,
		getDonations,
	} = useContext(CrowdFundingContext);

	const [allCampaign, setAllCampaign] = useState();
	const [userCampaign, setUserCampaign] = useState();

	useEffect(() => {
		const getCampaignsData = getCampaigns();
		const userCampaignsData = getUserCampaigns();

		return async () => {
			const allData = await getCampaignsData;
			const userData = await userCampaignsData;

			setAllCampaign(allData);
			setUserCampaign(userData);
		};
	}, []);

	const [openModal, setOpenModal] = useState(false);
	const [donateCampaign, setDonateCampaign] = useState();

	console.log(donateCampaign);

	return (
		<>
			<Hero titleData={titleData} createCampaign={createCampaign} />
			<Card
				title="All Listed Campaign"
				allCampaign={allCampaign}
				setOpenModal={setOpenModal}
				setDonate={setDonateCampaign}
			/>
			<Card
				title="Your Created Campaign"
				allCampaign={userCampaign}
				setOpenModal={setOpenModal}
				setDonate={setDonateCampaign}
			/>
			{openModal && (
				<PopUp
					setOpenModal={setOpenModal}
					getDonations={getDonations}
					donate={donateCampaign}
					donateFunction={donate}
				/>
			)}
		</>
	);
};

export default index;
