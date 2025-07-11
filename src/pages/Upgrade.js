import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Alert,
  AlertTitle,
  Switch,
  FormControlLabel,
  RadioGroup,
  FormControl,
  FormLabel,
  Radio,
  Dialog,
  DialogTitle,
  DialogContent,
  Stepper,
  Step,
  StepLabel,
  StepContent
} from '@mui/material';
import {
  Star as StarIcon,
  Check as CheckIcon,
  Close as CloseIcon,
  Diamond as DiamondIcon,
  WorkspacePremium as WorkspacePremiumIcon,
  AutoAwesome as AutoAwesomeIcon
} from '@mui/icons-material';
import { css, keyframes } from '@emotion/react';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

export default function Upgrade() {
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [paymentStep, setPaymentStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      period: 'forever',
      description: 'Perfect for getting started',
      color: '#666',
      gradient: 'linear-gradient(135deg, #666 0%, #999 100%)',
      features: [
        'Basic follower analysis',
        'Up to 100 followers',
        'Standard support',
        'Basic reports',
        'Web access only'
      ],
      limitations: [
        'Limited to 100 followers',
        'No advanced analytics',
        'No priority support',
        'No data export',
        'No custom branding'
      ],
      popular: false,
      badge: null
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 9.99,
      period: billingCycle === 'monthly' ? 'month' : 'year',
      description: 'Most popular choice for developers',
      color: '#43b649',
      gradient: 'linear-gradient(135deg, #43b649 0%, #66bb6a 100%)',
      features: [
        'Advanced follower analytics',
        'Unlimited followers',
        'Priority support',
        'Detailed reports',
        'Data export (JSON/CSV)',
        'Custom branding',
        'API access',
        'Bulk operations',
        'Advanced filtering',
        'Email notifications'
      ],
      limitations: [],
      popular: true,
      badge: 'Most Popular',
      savings: billingCycle === 'yearly' ? 'Save 20%' : null
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 29.99,
      period: billingCycle === 'monthly' ? 'month' : 'year',
      description: 'For teams and organizations',
      color: '#f9d923',
      gradient: 'linear-gradient(135deg, #f9d923 0%, #ffeb3b 100%)',
      features: [
        'Everything in Pro',
        'Team collaboration',
        'Advanced security',
        'Custom integrations',
        'White-label solution',
        'Dedicated support',
        'SLA guarantee',
        'Advanced analytics',
        'Custom reports',
        'API rate limits',
        'Webhook support',
        'Multi-account management'
      ],
      limitations: [],
      popular: false,
      badge: 'Best Value',
      savings: billingCycle === 'yearly' ? 'Save 25%' : null
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Senior Developer',
      company: 'TechCorp',
      avatar: 'https://i.pravatar.cc/150?img=1',
      rating: 5,
      text: 'ByeBuddy Pro has completely transformed how I manage my GitHub network. The analytics are incredible!',
      plan: 'Pro'
    },
    {
      name: 'Mike Chen',
      role: 'Open Source Maintainer',
      company: 'DevTools Inc',
      avatar: 'https://i.pravatar.cc/150?img=2',
      rating: 5,
      text: 'The enterprise features are exactly what our team needed. Highly recommended!',
      plan: 'Enterprise'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Community Manager',
      company: 'StartupXYZ',
      avatar: 'https://i.pravatar.cc/150?img=3',
      rating: 5,
      text: 'ByeBuddy helped us grow our community by 300% in just 6 months. Amazing tool!',
      plan: 'Pro'
    }
  ];

  const features = [
    {
      category: 'Analytics',
      items: [
        { name: 'Advanced Follower Analytics', free: false, pro: true, enterprise: true },
        { name: 'Growth Tracking', free: false, pro: true, enterprise: true },
        { name: 'Engagement Metrics', free: false, pro: true, enterprise: true },
        { name: 'Custom Reports', free: false, pro: true, enterprise: true },
        { name: 'Real-time Data', free: false, pro: true, enterprise: true }
      ]
    },
    {
      category: 'Features',
      items: [
        { name: 'Unlimited Followers', free: false, pro: true, enterprise: true },
        { name: 'Data Export', free: false, pro: true, enterprise: true },
        { name: 'API Access', free: false, pro: true, enterprise: true },
        { name: 'Bulk Operations', free: false, pro: true, enterprise: true },
        { name: 'Advanced Filtering', free: false, pro: true, enterprise: true },
        { name: 'Team Collaboration', free: false, pro: false, enterprise: true },
        { name: 'White-label Solution', free: false, pro: false, enterprise: true }
      ]
    },
    {
      category: 'Support',
      items: [
        { name: 'Email Support', free: true, pro: true, enterprise: true },
        { name: 'Priority Support', free: false, pro: true, enterprise: true },
        { name: 'Dedicated Support', free: false, pro: false, enterprise: true },
        { name: 'SLA Guarantee', free: false, pro: false, enterprise: true },
        { name: 'Phone Support', free: false, pro: false, enterprise: true }
      ]
    }
  ];

  const handleUpgrade = (planId) => {
    setSelectedPlan(planId);
    setShowPaymentDialog(true);
  };

  const handlePaymentClose = () => {
    setShowPaymentDialog(false);
    setPaymentStep(0);
  };

  const getPlanPrice = (plan) => {
    if (plan.id === 'free') return 0;
    const basePrice = plan.price;
    return billingCycle === 'yearly' ? basePrice * 12 * 0.8 : basePrice;
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, rgba(240,248,255,0.9) 0%, rgba(255,248,220,0.9) 100%)',
      backdropFilter: 'blur(20px)',
      pt: 10,
      pb: 4,
      px: { xs: 2, md: 4 }
    }}>
      {/* Header */}
      <Box sx={{ 
        mb: 6, 
        textAlign: 'center',
      }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          gap: 2, 
          mb: 3 
        }}>
          <Avatar sx={{ 
            width: 80, 
            height: 80, 
            background: 'linear-gradient(135deg, #f9d923 0%, #ffeb3b 100%)',
          }}>
            <WorkspacePremiumIcon sx={{ fontSize: 40, color: '#333' }} />
          </Avatar>
          <Box>
            <Typography 
              variant="h3" 
              sx={{ 
                fontWeight: 900,
                background: 'linear-gradient(135deg, #f9d923 0%, #43b649 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                mb: 1,
              }}
            >
              Upgrade to Premium
            </Typography>
            <Typography variant="h6" sx={{ color: '#666', fontWeight: 500 }}>
              Unlock the full potential of your GitHub network
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Billing Toggle */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        mb: 4,
      }}>
        <Paper sx={{ 
          p: 2, 
          background: 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(20px)',
          borderRadius: 3,
          boxShadow: '0 8px 32px rgba(67,182,73,0.1)',
          border: '2px solid rgba(255,255,255,0.3)',
        }}>
          <FormControlLabel
            control={
              <Switch
                checked={billingCycle === 'yearly'}
                onChange={(e) => setBillingCycle(e.target.checked ? 'yearly' : 'monthly')}
                color="primary"
              />
            }
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {billingCycle === 'yearly' ? 'Yearly' : 'Monthly'}
                </Typography>
                {billingCycle === 'yearly' && (
                  <Chip 
                    label="Save up to 25%" 
                    size="small" 
                    color="success" 
                    sx={{ fontWeight: 600 }}
                  />
                )}
              </Box>
            }
          />
        </Paper>
      </Box>

      {/* Pricing Plans */}
      <Grid container spacing={4} sx={{ mb: 6 }}>
        {plans.map((plan, index) => (
          <Grid item xs={12} md={4} key={plan.id}>
            <Card
              css={css`
                height: 100%;
                background: rgba(255,255,255,0.9);
                backdrop-filter: blur(20px);
                border-radius: 32px;
                box-shadow: ${plan.popular ? '0 16px 60px rgba(67,182,73,0.2)' : '0 8px 32px rgba(67,182,73,0.1)'};
                border: ${plan.popular ? '3px solid #43b649' : '2px solid rgba(255,255,255,0.3)'};
                transition: all 0.3s ease;
                animation: ${fadeIn} 1s ease-out ${index * 0.1 + 0.3}s both;
                position: relative;
                &:hover {
                  transform: translateY(-8px) scale(1.02);
                  box-shadow: 0 20px 80px rgba(67,182,73,0.3);
                }
              `}
            >
              {plan.badge && (
                <Box sx={{
                  position: 'absolute',
                  top: -12,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  zIndex: 1,
                }}>
                  <Chip
                    label={plan.badge}
                    color="primary"
                    sx={{
                      fontWeight: 700,
                      background: plan.gradient,
                      color: 'white',
                      boxShadow: '0 4px 20px rgba(67,182,73,0.3)',
                    }}
                  />
                </Box>
              )}
              
              <CardContent sx={{ p: 4, textAlign: 'center' }}>
                <Box
                  css={css`
                    display: inline-block;
                    padding: 24px;
                    border-radius: 50%;
                    background: ${plan.gradient};
                    margin-bottom: 24px;
                    animation: ${float} 3s ease-in-out infinite ${index * 0.5}s;
                  `}
                >
                  {plan.id === 'free' && <StarIcon sx={{ fontSize: 40, color: 'white' }} />}
                  {plan.id === 'pro' && <DiamondIcon sx={{ fontSize: 40, color: 'white' }} />}
                  {plan.id === 'enterprise' && <AutoAwesomeIcon sx={{ fontSize: 40, color: 'white' }} />}
                </Box>
                
                <Typography variant="h4" sx={{ fontWeight: 900, mb: 1, color: plan.color }}>
                  {plan.name}
                </Typography>
                
                <Typography variant="body1" sx={{ color: '#666', mb: 3 }}>
                  {plan.description}
                </Typography>
                
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h3" sx={{ fontWeight: 900, color: plan.color }}>
                    ${getPlanPrice(plan)}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#666' }}>
                    per {plan.period}
                  </Typography>
                  {plan.savings && (
                    <Chip 
                      label={plan.savings} 
                      size="small" 
                      color="success" 
                      sx={{ mt: 1, fontWeight: 600 }}
                    />
                  )}
                </Box>
                
                <List sx={{ textAlign: 'left', mb: 3 }}>
                  {plan.features.map((feature, idx) => (
                    <ListItem key={idx} sx={{ px: 0, py: 0.5 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <CheckIcon sx={{ color: plan.color, fontSize: 20 }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary={feature} 
                        primaryTypographyProps={{ 
                          variant: 'body2',
                          sx: { fontWeight: 500 }
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
                
                {plan.limitations.length > 0 && (
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" sx={{ color: '#f44336', fontWeight: 600, mb: 1 }}>
                      Limitations:
                    </Typography>
                    <List sx={{ textAlign: 'left' }}>
                      {plan.limitations.map((limitation, idx) => (
                        <ListItem key={idx} sx={{ px: 0, py: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <CloseIcon sx={{ color: '#f44336', fontSize: 16 }} />
                          </ListItemIcon>
                          <ListItemText 
                            primary={limitation} 
                            primaryTypographyProps={{ 
                              variant: 'body2',
                              sx: { color: '#666' }
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                )}
                
                <Button
                  variant={plan.popular ? "contained" : "outlined"}
                  fullWidth
                  size="large"
                  onClick={() => handleUpgrade(plan.id)}
                  sx={{
                    py: 1.5,
                    borderRadius: 3,
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    background: plan.popular ? plan.gradient : 'transparent',
                    borderColor: plan.color,
                    color: plan.popular ? 'white' : plan.color,
                    '&:hover': {
                      background: plan.popular ? plan.gradient : `${plan.color}15`,
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 25px rgba(67,182,73,0.3)',
                    }
                  }}
                >
                  {plan.id === 'free' ? 'Current Plan' : `Upgrade to ${plan.name}`}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Feature Comparison */}
      <Paper
        css={css`
          padding: 32px;
          margin-bottom: 48px;
          background: rgba(255,255,255,0.9);
          backdrop-filter: blur(20px);
          border-radius: 32px;
          box-shadow: 0 8px 32px rgba(67,182,73,0.1);
          border: 2px solid rgba(255,255,255,0.3);
          animation: ${fadeIn} 1s ease-out 0.8s both;
        `}
      >
        <Typography variant="h4" sx={{ fontWeight: 900, mb: 4, textAlign: 'center', color: '#1976d2' }}>
          Feature Comparison
        </Typography>
        
        {features.map((category, categoryIndex) => (
          <Box key={category.category} sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#43b649' }}>
              {category.category}
            </Typography>
            <Grid container spacing={2}>
              {category.items.map((item, itemIndex) => (
                <Grid item xs={12} key={item.name}>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    p: 2, 
                    borderRadius: 2,
                    background: 'rgba(67,182,73,0.05)',
                    border: '1px solid rgba(67,182,73,0.1)',
                  }}>
                    <Typography variant="body1" sx={{ flex: 1, fontWeight: 500 }}>
                      {item.name}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Chip 
                        label="Free" 
                        size="small" 
                        color={item.free ? "success" : "default"}
                        variant={item.free ? "filled" : "outlined"}
                        icon={item.free ? <CheckIcon /> : <CloseIcon />}
                      />
                      <Chip 
                        label="Pro" 
                        size="small" 
                        color={item.pro ? "success" : "default"}
                        variant={item.pro ? "filled" : "outlined"}
                        icon={item.pro ? <CheckIcon /> : <CloseIcon />}
                      />
                      <Chip 
                        label="Enterprise" 
                        size="small" 
                        color={item.enterprise ? "success" : "default"}
                        variant={item.enterprise ? "filled" : "outlined"}
                        icon={item.enterprise ? <CheckIcon /> : <CloseIcon />}
                      />
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}
      </Paper>

      {/* Testimonials */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" sx={{ fontWeight: 900, mb: 4, textAlign: 'center', color: '#1976d2' }}>
          What Our Users Say
        </Typography>
        <Grid container spacing={3}>
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} md={4} key={testimonial.name}>
              <Card
                css={css`
                  padding: 24px;
                  background: rgba(255,255,255,0.9);
                  backdrop-filter: blur(20px);
                  border-radius: 32px;
                  box-shadow: 0 8px 32px rgba(67,182,73,0.1);
                  border: 2px solid rgba(255,255,255,0.3);
                  animation: ${fadeIn} 1s ease-out ${index * 0.2 + 1}s both;
                `}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar src={testimonial.avatar} sx={{ mr: 2 }} />
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {testimonial.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#666' }}>
                      {testimonial.role} at {testimonial.company}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', mb: 2 }}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} sx={{ color: '#f9d923', fontSize: 20 }} />
                  ))}
                </Box>
                <Typography variant="body1" sx={{ mb: 2, fontStyle: 'italic' }}>
                  "{testimonial.text}"
                </Typography>
                <Chip 
                  label={`${testimonial.plan} Plan`} 
                  size="small" 
                  color="primary"
                  sx={{ fontWeight: 600 }}
                />
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* FAQ */}
      <Paper
        css={css`
          padding: 32px;
          background: rgba(255,255,255,0.9);
          backdrop-filter: blur(20px);
          border-radius: 32px;
          box-shadow: 0 8px 32px rgba(67,182,73,0.1);
          border: 2px solid rgba(255,255,255,0.3);
          animation: ${fadeIn} 1s ease-out 1.5s both;
        `}
      >
        <Typography variant="h4" sx={{ fontWeight: 900, mb: 4, textAlign: 'center', color: '#1976d2' }}>
          Frequently Asked Questions
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: '#43b649' }}>
              Can I cancel anytime?
            </Typography>
            <Typography variant="body1" sx={{ color: '#666' }}>
              Yes! You can cancel your subscription at any time. Your access will continue until the end of your current billing period.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: '#43b649' }}>
              Is there a free trial?
            </Typography>
            <Typography variant="body1" sx={{ color: '#666' }}>
              Yes! All paid plans come with a 14-day free trial. No credit card required to start.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: '#43b649' }}>
              What payment methods do you accept?
            </Typography>
            <Typography variant="body1" sx={{ color: '#666' }}>
              We accept all major credit cards, PayPal, and bank transfers for enterprise plans.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: '#43b649' }}>
              Do you offer refunds?
            </Typography>
            <Typography variant="body1" sx={{ color: '#666' }}>
              We offer a 30-day money-back guarantee. If you're not satisfied, we'll refund your payment.
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Payment Dialog */}
      <Dialog 
        open={showPaymentDialog} 
        onClose={handlePaymentClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ 
          background: 'linear-gradient(135deg, #43b649 0%, #66bb6a 100%)',
          color: 'white',
          fontWeight: 700,
        }}>
          Complete Your Upgrade
        </DialogTitle>
        <DialogContent sx={{ p: 4 }}>
          <Stepper activeStep={paymentStep} orientation="vertical">
            <Step>
              <StepLabel>Choose Payment Method</StepLabel>
              <StepContent>
                <FormControl component="fieldset" sx={{ mt: 2 }}>
                  <FormLabel component="legend">Payment Method</FormLabel>
                  <RadioGroup
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  >
                    <FormControlLabel value="card" control={<Radio />} label="Credit Card" />
                    <FormControlLabel value="paypal" control={<Radio />} label="PayPal" />
                    <FormControlLabel value="bank" control={<Radio />} label="Bank Transfer" />
                  </RadioGroup>
                </FormControl>
                <Button
                  variant="contained"
                  onClick={() => setPaymentStep(1)}
                  sx={{ mt: 2 }}
                >
                  Continue
                </Button>
              </StepContent>
            </Step>
            <Step>
              <StepLabel>Payment Details</StepLabel>
              <StepContent>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  You're upgrading to the {plans.find(p => p.id === selectedPlan)?.name} plan for ${getPlanPrice(plans.find(p => p.id === selectedPlan))} per {billingCycle === 'monthly' ? 'month' : 'year'}.
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => setPaymentStep(2)}
                  sx={{ mt: 2 }}
                >
                  Complete Payment
                </Button>
              </StepContent>
            </Step>
            <Step>
              <StepLabel>Confirmation</StepLabel>
              <StepContent>
                <Alert severity="success" sx={{ mb: 2 }}>
                  <AlertTitle>Payment Successful!</AlertTitle>
                  Your upgrade has been completed successfully. Welcome to premium!
                </Alert>
                <Button
                  variant="contained"
                  onClick={handlePaymentClose}
                >
                  Close
                </Button>
              </StepContent>
            </Step>
          </Stepper>
        </DialogContent>
      </Dialog>
    </Box>
  );
} 