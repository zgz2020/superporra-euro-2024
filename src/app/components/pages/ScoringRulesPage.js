import React from 'react'
import { ConnectedHeader } from '../Header'
import { ConnectedScoringRuleCategory } from '../ScoringRuleCategory'
import { teamRules, individualsRules } from '../../../utils/scoringRules'

export const ScoringRulesPage = () => (
    <div>
        <ConnectedHeader title="Scoring Rules" />
        <ConnectedScoringRuleCategory ruleCategory={teamRules} />
        <ConnectedScoringRuleCategory ruleCategory={individualsRules} />
    </div>
)