import { StageConfig } from "@/types";
import { Home, Lightbulb, Info, Rocket, FlaskConical, Target, Flag } from "lucide-react";


export const APP_NAME = "Idea4Start";

export const NAV_MAIN_ITEMS = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Ideas",
    url: "/ideas",
    icon: Lightbulb,
  },
  {
    title: "About",
    url: "/about",
    icon: Info,
  },
];


export const STAGE_CONFIG: StageConfig[] = [
  {
    value: 'idea',
    label: 'Idea',
    icon: Lightbulb,
    description: 'Initial concept phase',
    color: 'text-yellow-500'
  },
  {
    value: 'validation',
    label: 'Validation',
    icon: Target,
    description: 'Market research & validation',
    color: 'text-blue-500'
  },
  {
    value: 'prototype',
    label: 'Prototype',
    icon: FlaskConical,
    description: 'Building & testing phase',
    color: 'text-purple-500'
  },
  {
    value: 'mvp',
    label: 'MVP',
    icon: Rocket,
    description: 'Minimum viable product',
    color: 'text-orange-500'
  },
  {
    value: 'launched',
    label: 'Launched',
    icon: Flag,
    description: 'Live in production',
    color: 'text-green-500'
  }
];
