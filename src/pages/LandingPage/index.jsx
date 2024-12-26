import React, { useState } from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import './landingPage.css';
import bhu from "../../images/1.jpg";
import { Link, useNavigate } from 'react-router-dom';

export default function LandingPage(handleLogin) {
    const [activeTab, setActiveTab] = useState("hero");
    const navigate = useNavigate();
    const branchData = [
        {
            sno: 1,
            branch: "ALLAHABAD (PRAYAG)",
            president: {
                name: "Sh. R.P. Tewary",
                address: ["C – 51", "Staff Colony", "MNNIT , Allahabad – 211002"],
                mobile: "94506 03682",
                email: ["rptiwari@mnnit.ac.in"]
            },
            generalSecretary: {
                name: "Shri Vijay Shanker",
                address: ["MIG-223, Pritam Nagar", "Allahabad – 211011"],
                mobile: "+919415991472, +918382819941",
                email: "vijayshankeradv.2015@gmail.com"
            },
            treasurer: {
                name: "Sh. Manoj Kumar Singh",
                address: ["S – 34,", "Satyam Apartment", "Dayanand Marg, Civil Lines", "Allahabad – 211001"],
                mobile: "+919415630583",
                email: "manojsingh_adv@rediffmail.com"
            }
        },
        {
            sno: 2,
            branch: "AMBIKAPUR",
            president: {
                name: "Dr. Sidhatri Kumar Srivastava",
                address: ["Mayor Colony", "Subhash Nagar, Bhagwanpur", "Ambikapur, Chattisgarh – 497001"],
                mobile: "+919424252379",
                email: ["sh_srivastava1@yahoo.com", "sujeet_tripathi@gmail.com"]
            },
            generalSecretary: {
                name: "Dr. Shashi Nath Pandey",
                address: [
                    "Mahamana Malaviya Mission",
                    "Gauri Bhawan Sangam Chowk",
                    "Devi Ganj Road, Distt. Sarguja",
                    "Chattisgarh – 497001"
                ],
                mobile: "+919165654770",
                email: "drsnpandey.eng@gmail.com"
            }
        },
        {
            sno: 3,
            branch: "AMARKANTAK (I.G.N.T.U.) M.P.",
            president: {
                name: "Dr. Naveen Kumar Sharma",
                address: [
                    "of. Naveen Kumar Sharma",
                    "A-409, University Staff Quarters",
                    "IGNTU Campus, Lalpur-Podaki,",
                    "Anuppur, M.P. 484887"
                ],
                mobile: "+919406215277",
                email: ["naveengzp@gmail.com"]
            },
            generalSecretary: {
                name: "Dr. Lalit Kumar Mishra",
                address: [
                    "A-402, University Staff Quarters",
                    "IGNTU Campus, Lalpur-Podaki,",
                    "Anuppur, M.P. 484887"
                ],
                email: "lalitbhu@gmail.com",
                mobile: "91-9424127462"
            },
            treasurer: {
                name: "Dr. Naresh Kumar Sonkar",
                address: [
                    "Department of Sociology & Social",
                    "Anthropology",
                    "IGNTU, Amarkantak,",
                    "M.P. -. 484887"
                ],
                email: "naresh.sonkar82@gmail.com",
                mobile: "91-9479832415"
            }
        },
        {
            sno: 4,
            branch: "ANPARA",
            president: {
                name: "Er. R C Srivastava, CGM",
                address: [
                    "G-1,",
                    "Anpara Thermal Power Project",
                    "Anpara , Distt : Sonebhadra",
                    "Uttar Pradesh"
                ]
            },
            generalSecretary: {
                name: "Sh. Ajay Kumar Singh",
                address: [
                    "Anpara Thermal Power Project",
                    "Anpara , Distt : Sonebhadra,",
                    "Uttar Pradesh"
                ]
            },
            treasurer: {
                name: "Sh. Shiv Shanaker Tiwari",
                address: [
                    "Banwasi Chhatrawas,",
                    "Anpara Bazar, Anpara",
                    "Distt : Sonebhadra (UP)"
                ],
                mobile: "99193 84665"
            }
        },
        {
            sno: 5,
            branch: "AWADH (BAHRAICH)",
            president: {
                name: "Sh. Sanjeev Srivastava",
                address: [
                    "Gayatri Bal Sanskar Shala",
                    "Behind Bairouse School",
                    "Civil Lines, Bahraich – 271802",
                    "Uttar Pradesh"
                ],
                mobile: "+919415411136",
                email: ["sanjeevsrivastava.jansatta@gmail.com"]
            },
            generalSecretary: {
                name: "Sh. Alok Shukla",
                address: [
                    "Village Madhaupur",
                    "Post. Fakharpur",
                    "Distt. Bahraich – 271902",
                    "Uttar Pradesh"
                ],
                mobile: "+91 80054 35683",
                email: "alok.shukla0@gmail.com"
            },
            treasurer: {
                name: "Shri Arjun Kumar Gupta (Dalip)",
                address: [
                    "Nikat Shri Sidh Nath Mantri",
                    "Brahmni Pura, Distt : Behraich"
                ],
                mobile: "8543808633",
                email: "guptaarjunkumar@gmail.com"
            }
        },
        {
            sno: 6,
            branch: "Ahmedabad",
            president: {
                name: "Sh. Ranjit Kumar Jha,",
                address: [
                    "A-15, Shivpoojan Duplex,",
                    "Opp: New Little Flower School,",
                    "B/H: Janta Nagar, Chandkheda,",
                    "Ahmedabad, Gujarat. 382424."
                ],
                mobile: "8000452799",
                email: ["ranjitkumarjha@rediffmail.com"]
            },
            generalSecretary: {
                name: "Sh. Ravi Shankar Ojha",
                address: [
                    "1004 Noopur Tower",
                    "Near. Vishal Tower Ramdev Nager",
                    "Road, Satellite Ahmedabad 380015"
                ],
                mobile: "9898068682",
                email: "ravishankarojha40@gmail.com"
            },
            treasurer: {
                name: "Sh. Hitesh V Bhuria",
                address: [
                    "D-9, KALPTARU APPT",
                    "Behind Radha krishna Temple,",
                    "Camp road, Shahibaug",
                    "Ahmedabad, Gujarat. 380004"
                ],
                mobile: "9426354529",
                email: "hiteshburiya79@gmail.com"
            }
        },
        {
            sno: 7,
            branch: "BANGALORE",
            president: {
                name: "Sh. Sanjeev Kumar Gupta",
                address: [
                    "House No 14, Regent Place,",
                    "28, Varthur Road, Thubarahalli,",
                    "Whitefield, Bangalore - 560066"
                ],
                mobile: "+9199999 16309",
                email: ["sanjeev@sanjeevkgupta.com"]
            },
            generalSecretary: {
                name: "Sh. Anurag Tripathi",
                address: [
                    "Apartment 006",
                    "Vithola Apartment",
                    "Kalena Agrahara",
                    "Bannerughatta Road",
                    "Bangalore – 560076"
                ],
                mobile: "+919342413738",
                email: "anuragrt@gmail.com"
            },
            treasurer: {
                name: "Sh. Bipin Kishore Sinha",
                address: [
                    "Flat no. 003,Block no. A-5,",
                    "Paramount Pilatus Apptt., Arekere,",
                    "Banglore-560076"
                ],
                mobile: "94152 85575",
                email: "bipin.kish@gmail.com"
            }
        },
        {
            sno: 8,
            branch: "CHANDIGARH",
            president: {
                name: "Prof Krishna Mohan",
                address: [
                    "House No F 1",
                    "Sector 14, Pᵉnjab University",
                    "Chandigarh, 9915367013"
                ],
                email: ["krishnamohan291967@gmail.com"]
            },
            generalSecretary: {
                name: "Shri Shiv Kumar Bansal",
                address: [
                    "House no 1140, Sector 11",
                    "Panchkula Haryana"
                ],
                mobile: "9499266450",
                email: "skbansalpowergrid@gmail.com"
            },
            treasurer: {
                name: "Shri Mahesh Kumar Mathur",
                address: [
                    "#1740/2, Sector-43B",
                    "Chandigarh – 160036"
                ],
                mobile: "9888802950, 6283574594",
                email: "mathur@gmail.com"
            }
        },
        {
            sno: 9,
            branch: "DEHRADUN",
            president: {
                name: "Dr. Shrikant Chandola",
                address: [
                    "229, Vasant Vihar Phase – 1",
                    "Dehradun – 248006",
                    "Uttarakhand"
                ],
                mobile: "+919412054439",
                email: ["s_chandola2002@yahoo.com"]
            },
            generalSecretary: {
                name: "Dr. Suraj K. Parcha",
                address: [
                    "House No 268",
                    "Lane 9A, Mohit Nagar",
                    "Dehradun – 248006, Uttarakhand"
                ],
                mobile: "+919412053425",
                email: "parchask@gmail.com"
            },
            treasurer: {
                name: "Er. Kishore S. Rawat",
                address: [
                    "Sec. – 2, C – 59",
                    "Defence Colony",
                    "Dehradun – 248001, Uttarakhand"
                ],
                mobile: "+919475074051",
                email: "rawatisp@gmail.com"
            }
        },
        {
            sno: 10,
            branch: "DELHI-NCR",
            president: {
                name: "Shri Rohit Kumar Sinha",
                address: [
                    "#E-143, Tower 'E' Vivante",
                    "Noida Express Way",
                    "Sector-137, Noida-201301"
                ],
                mobile: "9310033616",
                email: ["rohitksinha@yahoo.com"]
            },
            generalSecretary: {
                name: "Mrs. Archana Gupta",
                address: [
                    "H-51, Sector-25",
                    "Noida – 201301"
                ],
                mobile: "9818444631",
                email: "Archana110@gmail.com"
            },
            treasurer: {
                name: "Shri Brijesh Srivastava",
                address: [
                    "A-92, Sector-12, Noida",
                    "Pin : 201301"
                ],
                mobile: "9212760744",
                email: "brijeshvsk@gmail.com"
            }
        },
        {
            sno: 11,
            branch: "HYDERABAD",
            president: {
                name: "SHRI PADAM CHAND JAIN",
                address: [
                    "Villa A7 Street No 148 149",
                    "Naandi Organo Beyond Yenkepally",
                    "Aziznagar K.v.Rangareddy Telangana-500 075"
                ],
                mobile: "9728 3851 7469",
                email: ["reachpcjain@gmail.com"]
            },
            generalSecretary: {
                name: "SHRI. GOPAL REDDY",
                address: [
                    "1-1-365/A/324 Flat no 324",
                    "Siddam Setty Hima Sai Heights Street",
                    "no 6Jawahar Nagar",
                    "Near Axis Bank Gandhi",
                    "NagarMusheeerabad Hydrabad",
                    "Telangana-500 020"
                ],
                mobile: "98481 53140",
                email: "bgreddy1955@gmail.com"
            },
            treasurer: {
                name: "Dr. KAMLESH KUMAR",
                address: [
                    "2-1/1, Flat No-A317, Mallapur,",
                    "Opp Noma Function Hall,",
                    "K.V.Rangareddy,",
                    "Telangana- 500 076"
                ],
                mobile: "94904 91722",
                email: "kumarkamleshkamlesh@rediffmail.com"
            }
        },
        {
            sno: 12,
            branch: "INDRAPRSTHA (DELHI)",
            president: {
                name: "Sh. CB Tripathi",
                address: [
                    "Type-6, H.No 12,",
                    "IHBAS Campus,",
                    "Dilshad Garden, Delhi – 92"
                ],
                mobile: "98683 96826",
                email: ["cbt_vns@hotmail.com"]
            },
            generalSecretary: {
                name: "Shri Sharad Srivastava",
                address: [
                    "H-091, DLF Capital Greens",
                    "Shivaji Marg, Moti Nagar,",
                    "Karampura, New Delhi110015"
                ],
                mobile: "96502 64466",
                email: "sharadexp@gmail.com"
            },
            treasurer: {
                name: "Sh. Gulab Chandra Shukla",
                address: [
                    "1/11546, Gali No – 10",
                    "Subhash Park, Shahdara",
                    "Delhi - 110092"
                ],
                mobile: "93697 36900",
                email: "advocategcshukla@gmail.com"
            }
        },
        {
            sno: 13,
            branch: "JAIPUR",
            president: {
                name: "Sh. Anirudh Singh",
                address: [
                    "Diggi Palace, Ram Singh Road",
                    "Near Suchna Kendra",
                    "Jaipur –"
                ],
                mobile: "09929014988",
                email: ["rudhsing@yahoo.co.in"]
            },
            generalSecretary: {
                name: "Sh. Krishna Kant Parashar",
                address: [
                    "52/29, Vashisht Marg",
                    "Mansarovar, Jaipur – 302020"
                ],
                mobile: "+919414716600",
                email: "kkparashar08@rediffmail.com"
            },
            treasurer: {
                name: "Sh. Kamal Kant Parashar",
                address: [
                    "3 – NA – 34",
                    "Jawahar Nagar",
                    "Jaipur – 302004"
                ],
                mobile: "+919829061710",
                email: "kamalkantparashar@yahoo.com"
            }
        },
        {
            sno: 14,
            branch: "KANPUR",
            president: {
                name: "",
                address: []
            },
            generalSecretary: {
                name: "Rashmi Khanna",
                address: [
                    "113/60, Swaroop Nagar",
                    "Kanpur – 208005, Uttar Pradesh"
                ],
                mobile: "+919335570757",
                email: "khanna.rashmi@gmail.com"
            },
            treasurer: {
                name: "Sh. Lalit Kumar Khanna",
                address: [
                    "113/7, Swaroop Nagar",
                    "Kanpur – 208005, Uttar Pradesh"
                ],
                mobile: "+919839101130",
                email: "lalitkhanna.kanpur@gmail.com"
            }
        },
        {
            sno: 15,
            branch: "LUCKNOW",
            president: {
                name: "Dr. A K Tripathi",
                address: [
                    "B-7, Sector-J,",
                    "Aliganj, Lucknow",
                    "Pin-226024"
                ],
                mobile: "9839137162",
                email: ["Tripathiak2010@hotmail.com"]
            },
            generalSecretary: {
                name: "Shri Devendra Swarup Shukla",
                address: [
                    "15/51, Indira Nagar",
                    "Lucknow – 226016"
                ],
                mobile: "91980 38889",
                email: "Devpreet1977@yahoo.com"
            },
            treasurer: {
                name: "Dr. Devendra Ram Malaviya",
                address: [
                    "Flat No K-306, Rapti Apartment",
                    "Gomti Nagar Extension",
                    "Lucknow – 226010"
                ],
                mobile: "9450041288",
                email: "malaviya2007@yahoo.co.in"
            }
        },
        {
            sno: 16,
            branch: "MUMBAI",
            president: {
                name: "Shri KK Noharia",
                address: [
                    "11, Aryavart",
                    "Narayan Dhabolkar Marg",
                    "Mumbai - 400006"
                ]
            },
            generalSecretary: {
                name: "Sh. Dinesh Chandra Gupta",
                address: [
                    "205, Sterling Estate,",
                    "Ram Chandra Lane Ext.",
                    "Kanchpada, Malad (West)",
                    "Mumbai – 400064"
                ],
                mobile: "+919322215192",
                email: "dcgupta51@hotmail.com"
            },
            treasurer: {
                name: "Shri J K Jain",
                address: [
                    "D-502, Vivek Apartment",
                    "Besant Street, Santacruz (W)",
                    "Mumbai – 400054"
                ],
                mobile: "9820757432",
                email: "Superprints09@gmail.com"
            }
        },
        {
            sno: 17,
            branch: "NAVI MUMBAI (KONKAN)",
            president: {
                name: "Shri. M P Singh",
                address: [
                    "Tirupati Corner Flat No 401",
                    "Sector 12 Plot No . C- 1",
                    "Kharghar , Navi Mumbai",
                    "Pin code 410210"
                ],
                mobile: "9755094242",
                email: ["mpsingh2009@hotmail.Com"]
            },
            generalSecretary: {
                name: "Dr. Madhav Dutt Pandey",
                address: [
                    "Flat No 16, Flower Building",
                    "Godrej Sky Garden",
                    "Takka Pawel, Navi Mumbai-410206"
                ],
                mobile: "+ 98192 79411",
                email: "madhavdattapandey@gmail.com"
            },
            treasurer: {
                name: "Shri. J C Pandey",
                address: [
                    "Hyde Park C3/1404 plot no 8/9/10",
                    "Sector 35G, Kharghar , Navi Mumbai",
                    "410210"
                ],
                mobile: "9820845995",
                email: "jcpandey2508@gmail.com"
            }
        },
        {
            sno: 18,
            branch: "NORTH EAST",
            president: {
                name: "Dr. Ganga Prasad Parsain",
                address: [
                    "Vice Chancellor",
                    "Tripura Central University",
                    "Surmani Nagar, Agartala – 799022"
                ],
                mobile: "09612158167",
                email: ["gpparsain@gmail.com"]
            },
            generalSecretary: {
                name: "Prof. Vinod Kumar Mishra",
                address: [
                    "Prof. & Head , Deptt of Hindi",
                    "Tripura Central University",
                    "Surmani Nagar, Agartala – 799022"
                ],
                mobile: "8470835403, 8097751394",
                email: "vkmtcj@gmail.com"
            },
            treasurer: {
                name: "Dr. Pawan Kumar Singh",
                address: [
                    "Assistant Director",
                    "Sports Board",
                    "Tripura Central University",
                    "Surmani Nagar, Agartala – 799022"
                ],
                mobile: "8054651548, 6009336751",
                email: "drpawan96@gmail.com"
            }
        },
        {
            sno: 19,
            branch: "OBRA",
            president: {
                name: "Shri R K Jha",
                address: [
                    "Obra Thermal Power Proejct",
                    "Distt : Sonebhadra, Obra (UP)"
                ]
            },
            generalSecretary: {
                name: "Shri G K Mishra",
                address: [
                    "Obra Thermal Power Proejct",
                    "Distt : Sonebhadra, Obra (UP)"
                ]
            },
            treasurer: {
                name: "Shri. Durgesh Kumar Mishra",
                address: [
                    "Obra Thermal Power Proejct",
                    "Distt : Sonebhadra, Obra (UP)"
                ]
            }
        },
        {
            sno: 20,
            branch: "PATNA",
            president: {
                name: "Mr. Bipin Kumar Singh",
                address: [
                    "LIG, A-010, Phase -1,",
                    "Ashiyana Nager , Gate No-3, Patna",
                    "Bihar,800025"
                ],
                mobile: "07992362557",
                email: ["bksingh269@gmail.com"]
            },
            generalSecretary: {
                name: "Sh. Rajni Kant",
                address: [
                    "Vidhan Legal Solutions",
                    "401/B,Aaradhya Appt.R.No-4,",
                    "Mahesh Nagar,",
                    "Patna - 800024"
                ],
                mobile: "7070995755",
                email: "c.rkantg@gmail.com"
            },
            treasurer: {
                name: "CS. Manit Kumar Singh",
                address: [
                    "Patel Colony, Sandalpur,",
                    "PO-Mahendru,",
                    "Patna, 800006"
                ],
                mobile: "0.9709934950",
                email: "talk2manit@gmail.com"
            }
        },
        {
            sno: 21,
            branch: "RAIPUR",
            president: {
                name: "Dr. Swarnlata Saraf",
                address: [
                    "C9, Lokmanya Grih Nirman Society",
                    "Rohinipuram, Behind Jain Temple,",
                    "Gol Chowk, DD Nagar,",
                    "Raipur-492010"
                ],
                mobile: "6261791242",
                email: [
                    "swarnlata_saraf@rediffmail.com",
                    "swarnlatasaraf@gmail.com"
                ]
            },
            generalSecretary: {
                name: "Dr. Manwendra Kumar Tripathi",
                address: [
                    "301, Nilgiri Apartments",
                    "NIT Raipur, GE Road Raipur",
                    "Pin – 492010 (CG)"
                ],
                mobile: "91 81037 66514",
                email: "mktripathi.mme@nitr.ac.in"
            },
            treasurer: {
                name: "Dr. Shiva Parihar",
                address: [
                    "B-207, Avinash Pearl",
                    "Near Ryan International School",
                    "Avani Vihar, Labhandi",
                    "Raipur-492006",
                    "Chhattisgarh"
                ],
                email: "shivaparihar@gmail.com",
                mobile: "9589038646"
            }
        },
        {
            sno: 22,
            branch: "RANCHI",
            president: {
                name: "Sh. Krishna Ballabh Prasad",
                address: [
                    "(Working President)",
                    "Akashkusum North",
                    "Office Para Doronda",
                    "Ranchi – 834002",
                    "Jharkhand"
                ],
                mobile: "+919546715999"
            },
            generalSecretary: {
                name: "Sh. Virendra Narayan Singh",
                address: [
                    "R-21/2",
                    "Harmu Housing Colony",
                    "Ranchi – 834002",
                    "Jharkhand"
                ],
                mobile: "+919431327129",
                email: "vnsingh0651@gmail.com"
            },
            treasurer: {
                name: "Sh. Vivek Bhasin",
                address: [
                    "Plot No. 2002/F",
                    "East Of Harmu Play Ground",
                    "Harmu Housing Colony",
                    "Ranchi – 834002",
                    "Jharkhand"
                ],
                mobile: "+919835151510",
                email: "bhasin3112@gmail.com"
            }
        },
        {
            sno: 23,
            branch: "RIHAND NAGAR (BIJPUR) SONBHADRA",
            president: {
                name: "Sh. Hare Ram Singh",
                address: [
                    "D-36, NH-4",
                    "Ntpc Township",
                    "Rihand Nagar, Distt. Sonebhadra – 231223",
                    "Uttar Pradesh"
                ],
                mobile: "+918005017823",
                email: ["hareramsingh65@gmail.com"]
            },
            generalSecretary: {
                name: "Sh. Ashish Verma",
                address: [
                    "D-211, NH-2",
                    "Ntpc Township",
                    "Rihand Nagar, Distt. Sonebhadra – 231223",
                    "Uttar Pradesh"
                ],
                mobile: "+918005493681",
                email: ["ashishverma@ntpc.co.in"]
            },
            treasurer: {
                name: "Sh. Kishore Gokuldas Gawade",
                address: [
                    "B-369, NH-3",
                    "Ntpc",
                    "Rihand Nagar, Distt. Sonebhadra – 231223",
                    "Uttar Pradesh"
                ],
                mobile: "+917458012454",
                email: []
            }
        },
        {
            sno: 24,
            branch: "UNCHAHAR",
            president: {
                name: "Sh. C P Mishra",
                address: [
                    "D-6, NTPC Colony",
                    "NTPC Unchahar, Post Unchahar",
                    "Distt. Rai Bareilly – 229406",
                    "Uttar Pradesh"
                ],
                mobile: "+09425178036",
                email: ["cpmishra1@rediffmail.com"]
            },
            generalSecretary: {
                name: "Sh. O S Pandey",
                address: [
                    "C-15, NTPC Colony",
                    "NTPC Unchahar",
                    "Rai Bareilly – 229406",
                    "Uttar Pradesh"
                ],
                mobile: "+9450962710",
                email: ["Ospandey01@gmail.com"]
            },
            treasurer: {
                name: "Sh. R P Batham",
                address: [
                    "NTPC, Unchahar",
                    "Distt. Rai Bareilly – 229406",
                    "Uttar Pradesh"
                ],
                mobile: "+9180049223716",
                email: ["rpbatham@gmail.com"]
            }
        },
        {
            sno: 25,
            branch: "VANANCHAL (CHANDAULI)",
            president: {
                name: "Prof. Arvind Kumar Joshi",
                address: [
                    "Deptt. Of Sociology",
                    "Faculty Of Social Science, BHU",
                    "Varanasi – 221005",
                    "Uttar Pradesh"
                ],
                mobile: "+919839335199",
                email: ["arvindvns@outlook.com"]
            },
            generalSecretary: {
                name: "Sh. Prajwalit Kaushik",
                address: [
                    "Susuwahi",
                    "Varanasi – 221011",
                    "Uttar Pradesh"
                ],
                mobile: "+919198748176",
                email: ["prajwalitkaushik@gmail.com"]
            },
            treasurer: {
                name: "Sh. Chandra Prakash Tiwari",
                address: [
                    "Vill. Parasi Kalan",
                    "Chandauli – 232104",
                    "Uttar Pradesh"
                ],
                mobile: "+917398674811",
                email: []
            }
        },
        {
            sno: 26,
            branch: "VARANASI (BHU)",
            president: {
                name: "Dr. Upendra Kumar Tripathii",
                address: [
                    "Ved Bhawanam",
                    "B-1/150E, Assi",
                    "Varanasi – 221005"
                ],
                mobile: null,
                email: ["Dr.upendrabhu@gmail.com"]
            },
            generalSecretary: {
                name: "Prof. Suman Jain",
                address: [
                    "Professor Hindi Deptt",
                    "Mahila Vibhag",
                    "Banaras Hindu University",
                    "Varanasi – 221005"
                ],
                mobile: "9415224887",
                email: ["Tarushika9@gmail.com"]
            },
            treasurer: {
                name: "Sh. Kedar Tiwari",
                address: [
                    "Plot No – 133",
                    "Balaji Nagar Colony",
                    "Samna Ghat, Lanka",
                    "Varanasi – 226005"
                ],
                mobile: "09415619343",
                email: ["kedarmaadularec@gmail.com"]
            }
        },
        {
            sno: 27,
            branch: "VARANASI (CITY)",
            president: {
                name: "Sh. Subhash Chand",
                address: [
                    "B – 38/1, Plot No. – 6",
                    "Mehmoorganj",
                    "Varanasi – 221010"
                ],
                mobile: "+919839059061",
                email: ["subhash_var@yahoo.com"]
            },
            generalSecretary: {
                name: "Sh. Harsh Singh",
                address: [
                    "B – 31/35, A – 24",
                    "Sankatmochan Colony",
                    "Varanasi – 221005"
                ],
                mobile: "+919935179600",
                email: ["shreeharshadv@gmail.com"]
            },
            treasurer: {
                name: "Sh. Anupam Agarwal",
                address: [
                    "B – 38/1",
                    "Plot No. – 1 / S – 2, Mehmurganj",
                    "Varanasi – 221010"
                ],
                mobile: "+919935039747, +919839049747",
                email: ["anurag.39@gmail.com"]
            }
        },
        {
            sno: 28,
            branch: "VARANASI (RURAL)",
            president: {
                name: "Dr. Siddh Nath Upadhyay",
                address: [
                    "B – 33/14 – 13",
                    "Gandhi Nagar, Nariya",
                    "Varanasi – 221005",
                    "Uttar Pradesh"
                ],
                mobile: "+919415372465",
                email: ["snupadhyay.che@iitbhu.ac.in"]
            },
            generalSecretary: {
                name: "Dr. Pradeep Kumar Mishra",
                address: [
                    "Giri Nagar Colony Extension",
                    "Birdopur, Mahmoorganj",
                    "Varanasi – 221010"
                ],
                mobile: "9415301462",
                email: ["pkmishra.che@iitbhu.ac.in"]
            },
            treasurer: {
                name: "CA. Ranjish Vishwakarma",
                address: [
                    "D-59/235-3-AR Lane No. 10",
                    "Nirala Nagar, Shivpurva, Mahmoorganj",
                    "Varanasi"
                ],
                mobile: "9415814898",
                email: ["cavishwakarma@gmail.com"]
            }
        }
    ];

    const contacts = [
        {
            id: 1,
            name: "JUSTICE (RETD.) GIRIDHAR MALAVIYA",
            designation: "Patron & Margdarshak",
            address: "26, AN JHA MARG, GEORGETOWN ALLAHABAD – 211002",
            contact: "0532 – 2468664, 09415234633",
            email: "gmalaviya@hotmail.com"
        },
        {
            id: 2,
            name: "DR. B.K. MODI",
            designation: "Patron",
            address: "MODI HOUSE, 36, AMRITA SHERGIL MARG, NEW DELHI – 110003",
            contact: "011 – 24633933, 24653269",
            email: "drbkmodi@gmail.com"
        },
        {
            id: 3,
            name: "DR. SHANKER VINAYAK TATTVAVADI",
            designation: "Patron",
            address: "DR. HEDGEWAR BHAWAN MAHAL, NAGPUR – 440032",
            contact: "09811820014, 07122723003",
            email: "svt_shankar@hotmail.com,svtatwawadi@gmail.com"
        },
        {
            id: 4,
            name: "SH. SWANT RANJAN",
            designation: "Patron",
            address: "BHARTI BHAWAN, 15-B, NEW COLONY, JAIPUR",
            contact: "9431858802",
            email: "Swant1951@gmail.com"
        },
        {
            id: 5,
            name: "PROF. RAM HARI TUPKARY",
            designation: "Patron",
            address: "75, VIDYA VIHAR, RING ROAD PRATAP NAGAR, NAGPUR – 440022",
            contact: "0712 – 2284873, 09822222942",
            email: "rhtupkary@gmail.com"
        },
        {
            id: 6,
            name: "SHRI KAMAL NAIN RAI",
            designation: "Patron",
            address: "C4/4112, VASANT KUNJ, NEW DELHI – 70",
            contact: "9810152894",
            email: "knrai@yahoo.co.in"
        }
    ];

    const renderTabContent = () => {
        switch (activeTab) {
            case "history":
                return (
                    <section id="history" className="py-5 content-overlay">
                        <h2>History</h2>
                        <h3>Mahamana Malaviya Mission ( 1978–2014)</h3>
                        <p>Mahamana Malviya Mission was born in the National Conference of Alumni of Banaras Hindu University on 9th April 1978, the first day of the year, in New Delhi, to re-establish the fading ideals and life values ​​of the great man and pioneer of the era , Pandit Madan Mohan Malviya .</p>
                        <p>The following resolutions were passed in this conference-</p>
                        <p>" Inspired by the sacred memory of Mahamana Pandit Madan Mohan Malaviya , the National Conference of the Alumni of Banaras Hindu University held on 9th April 1978 at Dharma Bhavan , New Delhi, decides that Mahamana Malaviya Mission should be established to keep the inspiring memory of Mahamana alive , to propagate and spread his ideas and to carry forward the educational and cultural campaign started by him in the national life .</p>
                        <p>" The conference resolves that this mission will be developed at the national level as a powerful medium to realize the life ideals and goals of Mahamana Malaviya and its units will be opened in all the states and major places. "</p>
                        <p>The conference gave its approval to the proposed constitution, objectives and programme, and rules and provisions of the Mission .</p>
                        <p>To take the work of the Mission forward, the conference unanimously elected Shri Baleshwar Agarwal as President and Shri Shanti Swaroop Chaddha as General Secretary . The President was given the authority to form the working committee of the Mission which would be universal in nature .</p>

                        <h3>Lack of Indianness in education</h3>
                        <p>Mahamana had unshakable faith in Hindu culture and wanted to propagate its best ideas and values . He had seen India's cultural heritage , drawn inspiration from its glorious traditions and tried to instill determination , self-confidence , self-respect and love for Indianness in the Indian psyche . He wanted to build a national character by inculcating moral values ​​in the youth . Mahamana had found lack of Indianness in modern education , and he laid the foundation of Hindu University to fill this gap .</p>
                        <p>It is unfortunate that after independence this deficiency has increased even more . Moral values ​​have declined rapidly in the country . Our old beliefs are breaking down . In fact, the Mission was born to re-establish these Indian cultural values ​​and to realize the dreams of Mahamana .</p>
                        <h3>Inauguration and Registration</h3>
                        <p>The mission was officially inaugurated by renowned scientist Dr. Atmaram on 25 December 1979 at the Constitution Club . Dr. Atmaram called upon the students of Banaras Hindu University to once again work towards achieving the ideals set by Mahamana and create such an environment in the country that could lead to the creation of the India of Mahamana's dreams .</p>
                        <p>In the year 1979, Mahamana Malaviya Mission was formally registered as a society and it also got the benefit of income tax exemption under section 80(G) of the Income Tax Act .</p>
                        <p>In all these programmes, the then Vice Chancellor of Banaras Hindu University, Dr. Harinarayan extended his full cooperation . On this occasion , messages and articles were received from the Prime Minister , Defense Minister and Vice Chancellor of Hindu University for the souvenir published .</p>
                        <p>On 25 December 1979 , Mahamana's 119th birth anniversary was celebrated in Malviya Nagar Park in New Delhi by Delhi Administration , Delhi Municipal Corporation , Hindi Sahitya Sammelan and Malviya Mission. In which the Vice Chancellor of Banaras Hindu University, Dr. Harinarayan threw light on Mahamana Malviya ji and his works . Later, the future programs of the Mission were discussed with the workers of the Mission . The Vice Chancellor assured full cooperation to the Mission on behalf of the University .</p>
                        <h3>Second session in Varanasi</h3>
                        <p>
                            The second session of Mahamana Malviya Mission was held on 11-12 October 1980 at Malviya Bhawan,
                            Banaras Hindu University, Varanasi. The session was inaugurated with a message from Chancellor Kashi
                            Naresh Dr. Vibhuti Narayan Singh. The session was presided over by the Vice Chancellor of the University
                            Dr. Harinarayan. About 250 students, teachers, Mahamana lovers and alumni from various parts of the country
                            participated in the session.
                        </p>
                        <p>
                            In the convention, seminars were organized on the topics of 'All-round Rural Development',
                            'Technical Advisory Service', 'Cultural, Religious Literature and Audio-Visual Aids Production' and 'Book Bank'.
                        </p>
                        <p>
                            In the open session, the Chairman of the Reception Committee, Dr. K.N. Udupa, threw light on the inspiring
                            life of Mahamana and appealed to the people to take guidance from his life path. Mahamana wanted that our
                            students should study the ancient scriptures. He said that following his teachings is more important than
                            paying floral tribute to Mahamana. The Chairman of the session, Vice Chancellor Dr. Harinarayan, in his
                            powerful speech, called upon people to adopt Mahamana's fearlessness and patriotism from his life. He said
                            that the country will prosper only when we unite to control the divisive forces and adopt a constructive
                            lifestyle and speed up the work of Loksangraha.
                        </p>
                        <p>
                            Mission President Shri Baleshwar Aggarwal said that in today's context, the relevance of Malviyaji's ideals
                            and thoughts has increased. He explained the role of the Mission in every direction and highlighted its
                            achievements.
                        </p>
                        <p>
                            In the general body meeting of the Mission, Shri Baleshwar Aggarwal was elected President, Shri Pannalal Jaiswal
                            was elected General Secretary and Shri Ambrish Gupta was elected Treasurer.
                        </p>
                    </section>
                );
            case "about":
                return (
                    <section id="about" className="py-5 content-overlay">
                        <h2>About Us</h2>
                        <h3>Vision</h3>
                        <p>The need of the hour is to revive the spirit and values for which Mahamana founded the Banaras Hindu University for the present and coming generations on whom lies the onus of nation building. The emphasis in education would be on character building, patriotism and regard for India’s rich heritage and culture.

                            The mission intends to mobilize the talent and financial resources of the BHU Alumni for the all round development of their Alma Mater and Motherland. The Mission proposes to develop a roadmap – a detailed action plan for making India a powerful country in the world.</p>
                        <h3>Objectives</h3>
                        <ul style={{ listStyleType: 'none', paddingLeft: '0px' }}>
                            <li>To propagate the ideals and thoughts of Mahamana Madan Mohan Malaviya.</li>
                            <li>To preserve and promote Indian Culture and tradition through various projects and Programmes.</li>
                            <li>To promote the values for which Malaviyaji created the Banaras Hindu University and to work for raising its
                                stature as a leading International Centre of learning.</li>
                            <li>To build a strong national character in youth through education based on Indian cultural and moral values.</li>
                        </ul>
                        <h3>Patron</h3>
                        <div className="container-fluid mt-4">
                            <div className="table-responsive">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="text-nowrap">S.NO</th>
                                            <th scope="col">NAME</th>
                                            <th scope="col">DESIGNATION</th>
                                            <th scope="col">ADDRESS/CONTACT NO & E.MAIL ID</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {contacts.map((contact) => (
                                            <tr key={contact.id}>
                                                <td>{contact.id}.</td>
                                                <td className="fw-bold">{contact.name}</td>
                                                <td>{contact.designation}</td>
                                                <td>
                                                    <div>
                                                        {contact.address}<br />
                                                        PH: {contact.contact}<br />
                                                        {contact.email}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>
                );
            case "contact":
                return (
                    <section id="contact" className="py-5 content-overlay">
                        <h2>Contact Us</h2>
                        <h3>Central Office - Delhi</h3>
                        <address>
                            <p>Email id : malaviyasmritibhawan@yahoo.com, malaviyamission@gmail.com</p>
                            <p>Contact No. : 011-45662594, 011-23238014.</p>
                            <p>Address: Malaviya Smriti Bhawan
                                52-53, Deen Dayal Upadhyay Marg
                                New Delhi 110002</p>
                        </address>
                        <h3>Branch Offices</h3>
                        <div className="container-fluid">
                            <h2 className="text-center my-4">MAHAMANA MALAVIYA MISSION – ALL INDIA BRANCHES</h2>
                            <div className="table-responsive">
                                <table className="table table-bordered">
                                    <thead className="table-light">
                                        <tr>
                                            <th>S.NO.</th>
                                            <th>BRANCH</th>
                                            <th>PRESIDENT</th>
                                            <th>GENERAL SECRETARY</th>
                                            <th>TREASURER</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {branchData.map((branch) => (
                                            <tr key={branch.sno}>
                                                <td>{branch.sno}.</td>
                                                <td>{branch.branch}</td>
                                                <td>
                                                    <strong>{branch.president.name}</strong><br />
                                                    {branch.president.address.map((line, index) => (
                                                        <React.Fragment key={index}>
                                                            {line}<br />
                                                        </React.Fragment>
                                                    ))}
                                                    {branch.president.mobile && (
                                                        <>Mob: {branch.president.mobile}<br /></>
                                                    )}
                                                    {branch.president.email && branch.president.email.map((email, index) => (
                                                        <React.Fragment key={index}>
                                                            {email}<br />
                                                        </React.Fragment>
                                                    ))}
                                                </td>
                                                <td>
                                                    <strong>{branch.generalSecretary.name}</strong><br />
                                                    {branch.generalSecretary.address.map((line, index) => (
                                                        <React.Fragment key={index}>
                                                            {line}<br />
                                                        </React.Fragment>
                                                    ))}
                                                    {branch.generalSecretary.mobile && (
                                                        <>Mob: {branch.generalSecretary.mobile}<br /></>
                                                    )}
                                                    {branch.generalSecretary.email && (
                                                        <>{branch.generalSecretary.email}<br /></>
                                                    )}
                                                </td>
                                                <td>
                                                    {branch.treasurer && (
                                                        <>
                                                            <strong>{branch.treasurer.name}</strong><br />
                                                            {branch.treasurer.address.map((line, index) => (
                                                                <React.Fragment key={index}>
                                                                    {line}<br />
                                                                </React.Fragment>
                                                            ))}
                                                            {branch.treasurer.mobile && (
                                                                <>Mob: {branch.treasurer.mobile}<br /></>
                                                            )}
                                                            {branch.treasurer.email && (
                                                                <>{branch.treasurer.email}<br /></>
                                                            )}
                                                        </>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>
                );
            case "hall of fame":
                return (
                    <section id="hall-of-fame" className="py-5 content-overlay">
                        <h2>Hall of Fame</h2>
                        <div class="alumni">
                            <div class="alumnus">
                                <h3>Bharat Ratna Mahamana Pt. Madan Mohan Malaviya</h3>
                                <p><strong>Field:</strong> Education, Politics</p>
                                <p><strong>Achievements:</strong> Founder of Banaras Hindu University, prominent leader in the Indian independence movement.</p>
                            </div>

                            <div class="alumnus">
                                <h3>Dr. Rajendra Prasad</h3>
                                <p><strong>Field:</strong> Politics</p>
                                <p><strong>Achievements:</strong> First President of India, key figure in the Indian independence movement.</p>
                            </div>

                            <div class="alumnus">
                                <h3>Dr. S. Radhakrishnan</h3>
                                <p><strong>Field:</strong> Education, Politics</p>
                                <p><strong>Achievements:</strong> Second President of India, renowned philosopher, and educator.</p>
                            </div>

                            <div class="alumnus">
                                <h3>Dr. A.P.J. Abdul Kalam</h3>
                                <p><strong>Field:</strong> Science, Politics</p>
                                <p><strong>Achievements:</strong> 11th President of India, aerospace scientist, and author.</p>
                            </div>

                            <div class="alumnus">
                                <h3>Shri Lal Bahadur Shastri</h3>
                                <p><strong>Field:</strong> Politics</p>
                                <p><strong>Achievements:</strong> Second Prime Minister of India, known for the slogan "Jai Jawan Jai Kisan".</p>
                            </div>
                        </div>
                    </section>
                );
            case "directory":
                return (
                    <section className="whos-who-section py-5 content-overlay">
                        <div className="row">
                            <div className="col-md-4 mb-3">
                                <div className="card-who p-3">
                                    <h4 className="card-who-title">President</h4>
                                    <p className="card-who-text"><strong>Name:</strong> Dr. Swarnlata Saraf</p>
                                    <p className="card-who-text"><strong>Contact:</strong> swarnlata_saraf@rediffmail.com</p>
                                </div>
                            </div>
                            <div className="col-md-4 mb-3">
                                <div className="card-who p-3">
                                    <h4 className="card-who-title">General Secretary</h4>
                                    <p className="card-who-text"><strong>Name:</strong> Dr. Manwendra Kumar Tripathi</p>
                                    <p className="card-who-text"><strong>Contact:</strong> mktripathi.mme@nitr.ac.in</p>
                                </div>
                            </div>
                            <div className="col-md-4 mb-3">
                                <div className="card-who p-3">
                                    <h4 className="card-who-title">Treasurer</h4>
                                    <p className="card-who-text"><strong>Name:</strong> Dr. Shiva Parihar</p>
                                    <p className="card-who-text"><strong>Contact:</strong> shivaparihar@gmail.com</p>
                                </div>
                            </div>
                        </div>
                    </section>
                );
                case "benefits":
                return (
                    <section className="benefits-section py-5 content-overlay">
                    <div className="benefits-container">
                      <h2 className="text-center mb-4">Benefits</h2>
                      
                      <div className="row">
                        {/* Benefits for Students */}
                        <div className="col-md-3 mb-4">
                          <div className="benefits-card p-3">
                            <h4>Benefits for Students</h4>
                            <ul>
                              <li>Access to career development resources and job opportunities.</li>
                              <li>Networking with alumni for mentorship and guidance.</li>
                              <li>Exclusive workshops, webinars, and events for skill development.</li>
                              <li>Stay connected with the university community for collaborations.</li>
                            </ul>
                          </div>
                        </div>
              
                        {/* Benefits for Alumni */}
                        <div className="col-md-3 mb-4">
                          <div className="benefits-card p-3">
                            <h4>Benefits for Alumni</h4>
                            <ul>
                              <li>Reconnect with old classmates and expand your professional network.</li>
                              <li>Opportunities to give back through mentoring or donating.</li>
                              <li>Access to alumni-exclusive events, reunions, and social gatherings.</li>
                              <li>Stay updated on university news, developments, and events.</li>
                            </ul>
                          </div>
                        </div>
              
                        {/* Benefits for Faculty */}
                        <div className="col-md-3 mb-4">
                          <div className="benefits-card p-3">
                            <h4>Benefits for Faculty</h4>
                            <ul>
                              <li>Collaboration opportunities with alumni on research and projects.</li>
                              <li>Access to funding opportunities and grants through alumni connections.</li>
                              <li>Increased visibility for academic contributions through alumni portal.</li>
                              <li>Networking with fellow faculty members and industry experts.</li>
                            </ul>
                          </div>
                        </div>
              
                        {/* Benefits for Department Heads */}
                        <div className="col-md-3 mb-4">
                          <div className="benefits-card p-3">
                            <h4>Benefits for Department Heads</h4>
                            <ul>
                              <li>Build partnerships with alumni to strengthen department programs.</li>
                              <li>Facilitate alumni involvement in curriculum development and guest lectures.</li>
                              <li>Access to potential donors and sponsors for department initiatives.</li>
                              <li>Enhance the department's reputation and reach through alumni success stories.</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                );
            default:
                return (
                    <section id="hero" className="text-center py-5 content-overlay">
                        <img src={bhu} alt="" width="300px" height="100px" />
                        <h1 className="display-4 fw-bold mb-3">Welcome to BHU Community</h1>
                        <p className="lead mb-4" style={{ fontWeight: '500' }}>
                            Connect, engage, and stay updated with your alma mater.
                        </p>
                        <Button size="lg" style={{ backgroundColor: '#301C58', color: 'white' }}>
                            Join Our Community
                        </Button>
                    </section>
                );
        }
    };

    return (
        <div className="d-flex flex-column min-vh-100 container-div-bg">
            {/* Navbar */}
            <Navbar expand="lg" className="py-3" style={{ backgroundColor: '#301C58', color: 'white' }}>
                <Container style={{ paddingTop: '30px' }}>
                    <Navbar.Brand href="#" style={{ color: 'white' }}>
                        BHU Alumni Portal
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link
                            className={`nav-tab ${activeTab === "hero" ? "active-tab" : ""}`}
                            onClick={() => setActiveTab("hero")}
                        >
                            Home
                        </Nav.Link>
                        <Nav.Link
                            className={`nav-tab ${activeTab === "history" ? "active-tab" : ""}`}
                            onClick={() => setActiveTab("history")}
                        >
                            History
                        </Nav.Link>
                        <Nav.Link
                            className={`nav-tab ${activeTab === "about" ? "active-tab" : ""}`}
                            onClick={() => setActiveTab("about")}
                        >
                            About Us
                        </Nav.Link>
                        <Nav.Link
                            className={`nav-tab ${activeTab === "contact" ? "active-tab" : ""}`}
                            onClick={() => setActiveTab("contact")}
                        >
                            Contact Us
                        </Nav.Link>
                        <Nav.Link
                            className={`nav-tab ${activeTab === "hall of fame" ? "active-tab" : ""}`}
                            onClick={() => setActiveTab("hall of fame")}
                        >
                            Hall Of Fame
                        </Nav.Link>
                        <Nav.Link
                            className={`nav-tab ${activeTab === "directory" ? "active-tab" : ""}`}
                            onClick={() => setActiveTab("directory")}
                        >
                            Directory of Notables
                        </Nav.Link>
                        <Nav.Link
                            className={`nav-tab ${activeTab === "benefits" ? "active-tab" : ""}`}
                            onClick={() => setActiveTab("benefits")}
                        >
                            Benefits
                        </Nav.Link>
                    </Nav>
                    <div>
                        <Button variant="outline-light" className="me-2" onClick={() => navigate('/login')}>
                            Login
                        </Button>
                        <Button variant="light" onClick={() => navigate('/register')}>Sign Up</Button>
                    </div>
                </Container>
            </Navbar>

            {/* Main Content */}
            <main className="flex-grow-1">
                <Container>{renderTabContent()}</Container>
            </main>

            {/* Footer */}
            <footer className="bg-light py-4 mt-auto">
                <Container className="text-center">
                    <p className="mb-0">&copy; {new Date().getFullYear()} BHU Alumni Portal. All rights reserved.</p>
                </Container>
            </footer>
        </div>
    );
}
