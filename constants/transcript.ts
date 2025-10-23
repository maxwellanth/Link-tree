
import type { TranscriptItem } from '../types';

export const transcript: TranscriptItem[] = [
    { type: 'output', text: 'SilverTech Oregon Kernel v1.0.0 initializing...', typed: true },
    { type: 'pause', duration: 800 },
    { type: 'output', text: 'Boot sequence complete. Welcome, user.', typed: true },
    { type: 'pause', duration: 500 },
    { type: 'command', text: 'log --system --since=2021-01-01' },
    { type: 'output', text: 'Fetching system logs... Found 1 entry.', typed: false },
    { type: 'pause', duration: 300 },
    { type: 'output', text: '---------------------------------------------------------', typed: false },
    { type: 'output', text: 'TIMESTAMP: 2021-03-15 09:00:00 PST', typed: false },
    { type: 'output', text: 'EVENT: Project "SilverLining" initiated.', typed: false },
    { type: 'output', text: 'USER: anthony@peninsula', typed: false },
    { type: 'output', text: 'DETAILS: Initial commit. A new approach to local tech consulting.', typed: false },
    { type: 'output', text: '---------------------------------------------------------', typed: false },
    { type: 'pause', duration: 1200 },
    { type: 'command', text: 'git log --oneline --author="anthony"' },
    { type: 'output', text: 'b4d4551 (HEAD -> main) feat: Core framework established', typed: false },
    { type: 'output', text: 'a1b32c2 feat: Community outreach module', typed: false },
    { type: 'output', text: 'f0e5d63 fix: Initial client onboarding flow', typed: false },
    { type: 'output', text: 'c7a9b8e docs: Mission statement v1', typed: false },
    { type: 'pause', duration: 900 },
    { type: 'command', text: 'cat ./docs/mission_statement_v1.md' },
    { type: 'output', text: 'Our mission is to provide accessible, high-quality technology solutions to businesses in Oregon, fostering growth and innovation in our local community. We believe in silver-platter service, without the enterprise price tag.', typed: true },
    { type: 'pause', duration: 1500 },
    { type: 'command', text: 'mv "Project SilverLining" "SilverTech Oregon"' },
    { type: "output", text: 'Rename successful. Project is now "SilverTech Oregon".', typed: false },
    { type: 'pause', duration: 500 },
    { type: 'special', action: 'load_ascii', command: 'cat assets/ascii-art (3).txt' }
];
