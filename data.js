const LANGUAGES = [
  {code:'en',label:'English',dir:'ltr'},
  {code:'zh',label:'中文',dir:'ltr'},
  {code:'hi',label:'हिन्दी',dir:'ltr'},
  {code:'es',label:'Español',dir:'ltr'},
  {code:'fr',label:'Français',dir:'ltr'},
  {code:'ar',label:'العربية',dir:'rtl'},
  {code:'pt',label:'Português',dir:'ltr'}
];

const TERMS = [
  ['Alliance','Your team and community inside Kingshot. A good alliance teaches, organizes events and helps you grow faster than playing alone.'],
  ['Alliance Technology','A shared technology system. Contributions may look small, but hundreds of small contributions unlock bonuses for everyone.'],
  ['Announcement','A message from leadership. It often includes event times, rules, strategy or important changes. Reading it prevents many problems.'],
  ['Bear Hunt','A recurring alliance event where members work together to deal as much damage as possible. It teaches rallies, timing and teamwork.'],
  ['Battle Report','A report showing what happened in combat. New players look at win or loss. Veterans look for why it happened.'],
  ['Buff','A positive bonus that improves performance, such as attack, defense, health, production or speed.'],
  ['Debuff','A negative effect that weakens an enemy or reduces effectiveness.'],
  ['F2P','Free-To-Play. A player who chooses not to spend money. F2P players can still be valuable through activity, planning and consistency.'],
  ['Gems','A premium currency. Spend them carefully. If a purchase will still feel good next week, it is probably worth considering.'],
  ['Joiner','A player who joins a rally started by someone else. Good joiners are essential because without joiners, there is no rally.'],
  ['KvK','Kingdom versus Kingdom. A large competitive event where entire kingdoms compete and preparation matters a lot.'],
  ['NAP','Non-Aggression Pact. An agreement between alliances to avoid attacking each other. NAP5 or NAP10 usually refers to how many alliances are protected.'],
  ['Power','A visible number representing account strength. Useful, but incomplete. Two players with similar power can perform very differently.'],
  ['R4','Rank 4. Usually an officer who helps with communication, events, recruitment and member support.'],
  ['R5','Rank 5. The alliance leader, responsible for direction, organization and final decisions.'],
  ['Rally','A group attack led by one player and joined by others. It is one of the clearest examples of teamwork in Kingshot.'],
  ['Rally Leader','The player who starts a rally. A good rally leader improves the performance of everyone joining.'],
  ['Speedups','Items that reduce waiting time. Many players save them for events so the same action also earns rewards.'],
  ['VIP','A long-term progression system with bonuses. It is not a shortcut, but it can create value over time.'],
  ['Whale','A player who spends significant money. Whales may grow fast, but money does not replace experience or good decisions.'],
  ['Fortress','A competitive alliance event focused on objectives, occupation and coordination.'],
  ['Sunfire','A major kingdom-scale event where organization and roles matter as much as raw combat power.'],
  ['Migration','Moving to another kingdom when the game rules allow it. A different kingdom can completely change the experience.'],
  ['Territory','Area controlled by an alliance. Territory can affect strategy, objectives and alliance coordination.'],
  ['Inactivity','When a player stops participating regularly. Alliances usually manage inactivity to protect active members.'],
  ['Promotion','A rank increase. It should mean responsibility, not just status.'],
  ['Builder','A player who strengthens the community by helping, teaching, organizing and supporting others.'],
  ['Strategist','A player who studies systems, reports and patterns to help the group make better decisions.'],
  ['Leadership Burnout','Exhaustion caused by carrying too much responsibility for too long. Delegation helps prevent it.'],
  ['Glossary','This page. Use it when chat starts sounding like another language.']
];

const FAQS = [
  {cat:'New Player', q:'Am I too late to start playing Kingshot?', a:'No. You may not catch the oldest or biggest spenders quickly, and that is fine. Your goal is not to beat the kingdom on day one. Your goal is to learn, join a good alliance and become more useful each week.'},
  {cat:'New Player', q:'What should I focus on during my first days?', a:'Keep it simple: join an active alliance, read messages, participate in events, contribute to technology and ask questions. Do not try to optimize systems you do not understand yet.'},
  {cat:'New Player', q:'I made a mistake. Should I restart?', a:'Usually no. Everyone spends something badly, upgrades something too early or misses an event. Most mistakes become small over time. The lesson is often more valuable than the lost resource.'},
  {cat:'Alliance', q:'Why should I contribute to Alliance Technology?', a:'Because technology benefits everyone. Your click may look small, but when many members do it every day, the alliance unlocks upgrades that help the whole team.'},
  {cat:'Alliance', q:'Why was I removed for inactivity?', a:'Active alliances need active members. If someone disappears without warning, leaders may need to make room. A quick message before time away can prevent misunderstandings.'},
  {cat:'Alliance', q:'How are promotions usually decided?', a:'Power can help, but leaders usually notice reliability first: showing up, communicating, helping, participating and being easy to trust.'},
  {cat:'Events', q:'Why do experienced players save speedups?', a:'Because many events reward actions they were already planning to do. Waiting for the right event can give both the upgrade and extra rewards.'},
  {cat:'Events', q:'Do I need to rank high to benefit from events?', a:'No. Many events reward participation at different levels. You do not need to win to grow. Showing up consistently matters.'},
  {cat:'Events', q:'Why is Bear Hunt important?', a:'It gives rewards and teaches teamwork, rally participation and timing. Even if your damage is low, participating helps you learn and grow.'},
  {cat:'Resources', q:'Should I spend my gems right away?', a:'Usually not. Gems are flexible and valuable. Before spending, ask if the decision will still feel good next week.'},
  {cat:'Resources', q:'Why am I always out of resources?', a:'Because growth consumes resources quickly. Start noticing where resources go: buildings, research, troops and heroes. Understanding flow helps you plan.'},
  {cat:'Resources', q:'Why does progress feel slow sometimes?', a:'Because growth is not linear. Early progress is fast. Later, improvements take more planning. Slow progress is not failure.'},
  {cat:'Combat', q:'Why do I lose against players with similar power?', a:'Power is only part of the story. Heroes, research, troop composition, buffs and technology can all change the result. Check the battle report.'},
  {cat:'Combat', q:'What makes a hero good?', a:'Good for what? Some heroes are better for events, some for rallies, some for specific roles. Context matters more than popularity.'},
  {cat:'Combat', q:'Should I upgrade every hero?', a:'Not equally. Hero resources are limited. Focus on heroes that support your goals and current stage of the game.'},
  {cat:'Leadership', q:'What makes a good leader?', a:'Good leaders help more than they command. They communicate, organize, solve problems and make the game better for the people around them.'},
  {cat:'Leadership', q:'Do I need a title to be a leader?', a:'No. Leadership often starts when a player helps others, answers questions and supports the group before any title appears.'},
  {cat:'Kingdom', q:'What is NAP?', a:'NAP means Non-Aggression Pact. It is an agreement between alliances to reduce internal conflict. Rules vary by kingdom, so always check local rules.'},
  {cat:'Spending', q:'Is Kingshot pay-to-win?', a:'Yes, spending can accelerate progress. But money does not replace experience, timing, participation or leadership.'},
  {cat:'Spending', q:'Can free-to-play players be valuable?', a:'Absolutely. F2P players can become excellent joiners, organizers, teachers, strategists and leaders through consistency and good decisions.'}
];

const QUICK_START_SECTIONS = [
  ['Welcome To Kingshot', `If you recently started playing Kingshot, there is a good chance you feel a little overwhelmed. That is normal. In the first days, the game looks simple: build, train, upgrade, unlock a hero, join an alliance. Then people start talking about Bear Hunt, rallies, Fortress, Sunfire, Technology, NAP, KvK, whales, R4 and R5. At some point almost every player asks: “What am I supposed to focus on?” For now, your goal is not to master the game. Your goal is to understand the next step.`],
  ['Kingshot Is Bigger Than Your City', `When you start, everything seems to happen inside your city. Your buildings. Your troops. Your heroes. Your resources. After a while you notice something: the strongest players are usually inside strong alliances, and strong alliances are part of stronger kingdoms. Your account matters, but it is one piece of a much larger puzzle.`],
  ['Do Not Worry About Playing Perfectly', `You are going to make mistakes. You will spend something too early, miss an event, invest in something you later regret or misunderstand a mechanic. Every veteran did the same. The goal is not avoiding every mistake. The goal is learning from them fast enough that they stop repeating.`],
  ['What Kind Of Game Is Kingshot Really?', `At first it looks like a city-building game. Then you realize it is a game about decisions. Should you spend resources now or wait? Join this rally or save troops? Invest in this hero or wait? There is rarely a perfect answer. There is usually a better answer. Players who keep learning usually start making more of those.`],
  ['Free-To-Play And Pay-To-Win', `Some players spend money. Some spend a lot. You may not catch the biggest spender in the kingdom, and that is okay. Money can accelerate progress. It cannot replace participation, reliability, experience or good judgment. Compare yourself to last week, not to the biggest whale.`],
  ['Where Do You Fit In?', `Spend a few days inside an active alliance and you will notice that not everyone contributes the same way. Some love combat. Some organize events. Some answer questions. Some study reports. Some keep the community alive behind the scenes. You do not need to choose perfectly today. Just start noticing what kind of contribution feels natural.`],
  ['Different Types Of Players', `Fighters enjoy combat. Rally Leaders help many players work together. Strategists study systems. Builders help people and culture. Leaders organize groups and solve problems. Most experienced players become a mix over time. These are not classes. They are starting directions.`],
  ['Your First Week', `Find an active alliance. Participate in at least one event. Contribute to Alliance Technology. Ask at least one question. Read an alliance announcement. Learn a few terms from the Glossary. If you do those things, you already started better than many players who only chase power.`],
  ['Common Beginner Mistakes', `Trying to catch whales. Spending everything immediately. Ignoring events because you feel weak. Never asking questions. Ignoring alliance messages. Thinking power is everything. Changing direction every few days. Forgetting that this is still a game. If you recognize yourself in one of these, relax. Most of us did it too.`],
  ['Where To Go Next', `If game terms confuse you, open the Glossary. If you have a specific question, use the Knowledge Base or Search. If you want to learn the basics, go to Foundation Academy. If you just joined an alliance, read Alliance Guide. You do not need the whole Academy today. You need the next useful lesson.`]
];

const ALLIANCE_GUIDE = [
  ['Welcome To Alliance Life', `Joining an alliance changes Kingshot. Before, you were mostly building your own city. Now you are part of a team. Teams work differently. You do not need to know everything. You do need to participate, communicate and respect the people playing with you.`],
  ['Read The Chat And Announcements', `You do not need to be online all day, but try to check what leadership is saying. Event times, strategy changes, rally calls and important rules often pass through chat or announcements. Missing information is one of the easiest ways to miss opportunities.`],
  ['Contribute To Technology', `Technology looks small at first. A few clicks, a few numbers, nothing dramatic. But when many members contribute every day, the alliance unlocks bonuses that help everyone. This is one of the simplest ways to show you are helping build something bigger than your own account.`],
  ['Participate Before You Feel Ready', `Many players wait until they are strong before joining events. Usually, it works the other way around: they become stronger because they participate. Join rallies. Try Bear Hunt. Ask what to send. Learn by doing.`],
  ['Promotion Means Responsibility', `A promotion is not just a trophy. Officers help organize, communicate and solve problems. If you want to become R4 someday, start by becoming reliable. Show up, help, communicate and learn.`],
  ['Real Life Comes First', `Work, family, school and health matter more than any event. The issue is usually not absence. The issue is silence. If you will be away, send a message when possible. It prevents many misunderstandings.`]
];

const FOUNDATION_LESSONS = [
  ['Opportunity Cost', `You saved resources for days and finally started a big upgrade. Two days later, an event begins that rewards exactly that upgrade. The upgrade was not wrong. The timing might have been. Opportunity Cost means every choice closes some doors while opening others.`],
  ['Busy Is Not Always Progress', `Two players spend two hours online. One joins an event, contributes to technology and prepares for tomorrow. The other clicks around randomly. Both were active. Only one clearly moved forward.`],
  ['Compounding', `A single contribution, one Bear Hunt or one lesson rarely changes everything. Repeated for months, those small actions become a completely different account. This is why consistent players often surprise everyone later.`],
  ['Strategic Patience', `Sometimes waiting is not laziness. It is timing. Saving speedups for an event can turn one upgrade into one upgrade plus rewards. The goal is not waiting forever. The goal is spending at the right moment.`],
  ['Participation', `Many players say, “I’ll participate when I’m stronger.” In Kingshot, the opposite often happens: you become stronger because you participate. Events give rewards, experience and confidence.`],
  ['Reliability', `Every alliance remembers the player who always shows up. Maybe not the strongest. Maybe not an officer. But reliable. Power gets attention. Reliability earns trust.`],
  ['Curiosity', `Some players learn faster because they ask why. Why did we lose? Why is this hero used? Why save speedups? Curiosity turns normal gameplay into training.`],
  ['Power Is Not The Whole Story', `Power matters, but it does not explain everything. Two accounts can look similar and perform differently because of heroes, research, formation, buffs and knowledge.`],
  ['The Value Of Reading', `Many answers are already inside the game: event pages, hero skills, reports, alliance mail and tooltips. Reading a few seconds can save days of confusion.`],
  ['Community', `People often start for the game and stay for the community. The best alliances are not only strong. They feel alive, helpful and organized.`]
];

const ACADEMIES = [
  ['foundation','Foundation Academy','Learn the basics that make everything else easier.','🏰',true],
  ['player','Player Academy','Growth, habits, value and long-term account development.','📈',false],
  ['combat','Combat Academy','Reports, troops, formations, rallies and battlefield thinking.','⚔️',false],
  ['hero','Hero Academy','Roles, skills, investment, synergy and hero evaluation.','🦸',false],
  ['event','Event Academy','Bear Hunt, Fortress, Sunfire, KvK and event preparation.','🏆',false],
  ['alliance','Alliance Academy','Contribution, culture, recruitment, promotion and retention.','🤝',false],
  ['officer','Officer Playbook','Daily duties, communication, event operations and member support.','📜',false],
  ['leadership','Leadership Academy','Trust, delegation, burnout, decision quality and future leaders.','👑',false],
  ['kingdom','Kingdom Academy','NAP, diplomacy, cooperation, kingdom health and conflict.','🌍',false],
  ['builder','Kingdom Builder','Community, legacy and systems that last beyond one player.','🏛️',false]
];
