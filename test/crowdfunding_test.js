// chai assertion library
const { expect } = require("chai");

describe("CrowdFunding", function () {
	let crowdFunding;

	beforeEach(async function () {
		// Deploy the contract before each test
		const CrowdFunding = await ethers.getContractFactory("CrowdFunding");
		crowdFunding = await CrowdFunding.deploy();
		await crowdFunding.deployed();
	});

	it("should create a new campaign", async function () {
		const [deployer] = await ethers.getSigners();

		const owner = deployer.address;
		const title = "Test Campaign";
		const description = "This is a test campaign";
		const target = ethers.utils.parseEther("1"); // 1 ETH
		const deadline = Math.floor(Date.now() / 1000) + 3600; // Current timestamp + 1 hour

		const createCampaignTx = await crowdFunding.createCampaign(
			owner,
			title,
			description,
			target,
			deadline
		);
		await createCampaignTx.wait();

		const numberOfCampaigns = await crowdFunding.numberOfCampaigns();
		expect(numberOfCampaigns).to.equal(1);

		const campaign = await crowdFunding.campaigns(0);
		expect(campaign.owner).to.equal(owner);
		expect(campaign.title).to.equal(title);
		expect(campaign.description).to.equal(description);
		expect(campaign.target).to.equal(target);
		expect(campaign.deadline).to.equal(deadline);
		expect(campaign.amountCollected).to.equal(0);
	});
});
