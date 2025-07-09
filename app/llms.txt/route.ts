import { NextResponse } from 'next/server'

// 定义LLMs配置的类型
interface LLMsConfig {
  rules: {
    userAgent: string;
    allow: string[];
    disallow: string[];
    crawlDelay: number;
    maxTokens: number;
    maxRequests: number;
    rateLimit: string;
  };
  allowedPurposes: string[];
  disallowedPurposes: string[];
  license: {
    url: string;
    terms: string[];
    limitations: string[];
  };
  lastUpdated: string;
  owner: {
    name: string;
    url: string;
    email: string;
  };
  preferredFormat: {
    type: string;
    encoding: string;
    language: string[];
  };
  llmGuidelines: {
    modelRequirements: string[];
    dataUsage: string[];
    privacyRules: string[];
    ethicalGuidelines: string[];
    outputRequirements: string[];
  };
  contentPolicies: {
    allowedContent: string[];
    prohibitedContent: string[];
    contentModeration: string[];
  };
  apiUsage: {
    endpoints: string[];
    authentication: string;
    quotaLimits: string;
    supportedMethods: string[];
  };
}

// 生成llms.txt内容
function generateLLMsContent(): string {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://text-to-svg.tool.tokyo'
  
  const config: LLMsConfig = {
    rules: {
      userAgent: '*',
      allow: [
        '/',
        '/tutorials/',
        '/examples/',
        '/sources/',
        '/about/',
      ],
      disallow: [
        '/api/',
        '/admin/',
        '/_next/',
        '/_vercel/',
        '/user/',
      ],
      crawlDelay: 10,
      maxTokens: 4096,
      maxRequests: 60,
      rateLimit: '60 requests per minute',
    },
    allowedPurposes: [
      'research',
      'education',
      'search',
      'content-analysis',
      'non-commercial-use',
      'academic-research',
    ],
    disallowedPurposes: [
      'commercial-training',
      'commercial-reproduction',
      'disinformation',
      'harassment',
      'content-scraping',
      'automated-content-generation',
      'model-training-without-permission',
    ],
    license: {
      url: `${baseUrl}/license`,
      terms: [
        'attribution-required',
        'no-commercial-use',
        'no-derivatives',
        'no-model-training',
      ],
      limitations: [
        'no-scraping',
        'no-bulk-downloads',
        'no-automated-access',
        'no-redistribution',
      ],
    },
    lastUpdated: new Date().toISOString(),
    owner: {
      name: 'Text to SVG',
      url: baseUrl,
      email: 'siyuantong7@gmail.com',
    },
    preferredFormat: {
      type: 'html',
      encoding: 'utf-8',
      language: ['zh', 'en', 'fr'],
    },
    llmGuidelines: {
      modelRequirements: [
        'respect-robots-txt',
        'identify-as-bot',
        'honor-rate-limits',
        'preserve-copyright-notices',
        'maintain-content-integrity',
      ],
      dataUsage: [
        'no-personal-data-collection',
        'no-user-tracking',
        'respect-privacy-settings',
        'data-minimization',
      ],
      privacyRules: [
        'no-user-data-retention',
        'no-behavior-tracking',
        'no-profile-building',
        'respect-do-not-track',
      ],
      ethicalGuidelines: [
        'prevent-misuse',
        'ensure-transparency',
        'avoid-bias',
        'protect-user-rights',
      ],
      outputRequirements: [
        'maintain-attribution',
        'preserve-license-info',
        'indicate-ai-generation',
        'provide-source-links',
      ],
    },
    contentPolicies: {
      allowedContent: [
        'public-documentation',
        'api-descriptions',
        'usage-examples',
        'technical-guides',
      ],
      prohibitedContent: [
        'private-user-data',
        'sensitive-information',
        'proprietary-code',
        'authentication-details',
      ],
      contentModeration: [
        'respect-content-warnings',
        'follow-ethical-guidelines',
        'maintain-content-quality',
        'verify-information-accuracy',
      ],
    },
    apiUsage: {
      endpoints: [
        '/api/convert',
        '/api/preview',
        '/api/export',
      ],
      authentication: 'required-for-api-access',
      quotaLimits: '1000 requests per day',
      supportedMethods: ['GET', 'POST'],
    },
  }

  return `# AI Crawler Rules
User-Agent: ${config.rules.userAgent}
${config.rules.allow.map(path => `Allow: ${path}`).join('\n')}
${config.rules.disallow.map(path => `Disallow: ${path}`).join('\n')}
Crawl-Delay: ${config.rules.crawlDelay}
Max-Tokens: ${config.rules.maxTokens}
Max-Requests: ${config.rules.maxRequests}
Rate-Limit: ${config.rules.rateLimit}

# Allowed Purposes
Allowed-Purposes: ${config.allowedPurposes.join(', ')}

# Disallowed Purposes
Disallowed-Purposes: ${config.disallowedPurposes.join(', ')}

# License
License-URL: ${config.license.url}
License-Terms: ${config.license.terms.join(', ')}
License-Limitations: ${config.license.limitations.join(', ')}

# Site Information
Last-Updated: ${config.lastUpdated}
Owner-Name: ${config.owner.name}
Owner-URL: ${config.owner.url}
Owner-Email: ${config.owner.email}

# Content Format
Preferred-Format: ${config.preferredFormat.type}
Content-Encoding: ${config.preferredFormat.encoding}
Content-Language: ${config.preferredFormat.language.join(', ')}

# LLM Guidelines
## Model Requirements
${config.llmGuidelines.modelRequirements.map(req => `- ${req}`).join('\n')}

## Data Usage Rules
${config.llmGuidelines.dataUsage.map(rule => `- ${rule}`).join('\n')}

## Privacy Rules
${config.llmGuidelines.privacyRules.map(rule => `- ${rule}`).join('\n')}

## Ethical Guidelines
${config.llmGuidelines.ethicalGuidelines.map(guide => `- ${guide}`).join('\n')}

## Output Requirements
${config.llmGuidelines.outputRequirements.map(req => `- ${req}`).join('\n')}

# Content Policies
## Allowed Content
${config.contentPolicies.allowedContent.map(content => `- ${content}`).join('\n')}

## Prohibited Content
${config.contentPolicies.prohibitedContent.map(content => `- ${content}`).join('\n')}

## Content Moderation
${config.contentPolicies.contentModeration.map(rule => `- ${rule}`).join('\n')}

# API Usage
API-Endpoints: ${config.apiUsage.endpoints.join(', ')}
Authentication: ${config.apiUsage.authentication}
Quota-Limits: ${config.apiUsage.quotaLimits}
Supported-Methods: ${config.apiUsage.supportedMethods.join(', ')}
`
}

export async function GET() {
  const content = generateLLMsContent()
  
  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600'
    }
  })
} 