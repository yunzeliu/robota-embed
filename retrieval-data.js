// Public display data transcribed from the supplied retrieval-final-v1 archive.
// Raw Top-10 order and exact paired ranks are preserved; scores and internal paths are omitted.
// firstEpisodeRank is derived only within Top-10; null is not a missing/failed experiment.
// Robota-Embed is the current display name; legacy IDs and media paths remain archival identifiers.
window.PHYSIS_RETRIEVAL_PROTOCOL = {
  "checkpointStep": 26275,
  "checkpointSha256": "881f47877718a42626b7408c530d26dcf179bb5d35ec6ed6a849e373d9b6dd26",
  "omniRevision": "865db1bb57e369a85357cf114cbd6b3c5322d19d",
  "geminiModel": "gemini-embedding-2",
  "geminiApiVersion": "v1beta",
  "geminiImmutableRevision": null,
  "sourceGalleryVersion": "frozen-four-domain-v1",
  "sourceGallerySha256": "f5b978f5426a93ed66a27c73af0fbc23d2d8c4b0ee0e01231dde38ea243513d3",
  "sourceGallerySize": 8000,
  "effectiveGallerySizes": {
    "physis": 8000,
    "gemini": 7983,
    "omni": 8000
  },
  "effectiveQueryCounts": {
    "physis": 4000,
    "gemini": 3986,
    "omni": 4000
  },
  "reranking": false,
  "selection": "Four selected qualitative cases, one per source; not a random sample or an aggregate accuracy estimate.",
  "partition": "The selected queries use the benchmark test partition; the underlying benchmark is mixed-source.",
  "galleryNote": "All models share the frozen source gallery. Gemini has 7,983 effective candidates after 17 archived API service failures; Robota-Embed and Omni each have 8,000.",
  "pairedRankDefinition": "Rank of the exact paired future clip, not the rank of the displayed Top-1 result.",
  "firstEpisodeRankDefinition": "First same-episode position in the archived Top-10. Null means no same-episode candidate appears in those ten entries; the exact later rank is unavailable.",
  "queryNote": "Gemini and Omni use the original current frame plus instruction; Robota-Embed uses the frozen SAM3 crop, instruction, and synchronized current action.",
  "videoNote": "Each four-second video visualizes the benchmark-selected 16 future frames at 4 fps; it is not a native-rate recording.",
  "droidSourceNote": "Legacy DROID frames were reconstructed with the benchmark decoder; no frozen video-array hash or separate query-action hash was available."
};

window.PHYSIS_RETRIEVAL_CASES = [
  {
    "id": "egodex-exact-hit",
    "source": "EgoDex",
    "category": "Exact clip hit",
    "instruction": "Sweep beads into a cleaning pan using a sweeper on a green tablecloth while sitting.",
    "queryId": "e3857b9c9e763cb94c91105c",
    "actionDim": 57,
    "actionSchema": "cosmos3_ego9_right_wrist9_right_fingertips15_left_wrist9_left_fingertips15_v1",
    "anchorSeconds": 14.9,
    "insight": "All three retrievers return the exact paired future at rank 1. This shared success illustrates the benchmark's exact-clip target.",
    "models": [
      {
        "id": "gemini",
        "name": "Gemini Embedding 2",
        "input": "V + L",
        "pairedRank": 1,
        "firstEpisodeRank": 1,
        "firstEpisodeRankStatus": "Observed in archived Top-10",
        "gallerySize": 7983,
        "top10": [
          {
            "rank": 1,
            "id": "e3857b9c9e763cb94c91105c",
            "instruction": "Sweep beads into a cleaning pan using a sweeper on a green tablecloth while sitting.",
            "relation": "Exact clip",
            "anchorDeltaSeconds": 0
          },
          {
            "rank": 2,
            "id": "0bf381135f6b632afae0ea5d",
            "instruction": "Sweep beads into the cleaning pan using the sweeper on a green tablecloth while sitting.",
            "relation": "Other episode",
            "anchorDeltaSeconds": null
          },
          {
            "rank": 3,
            "id": "a31b108618f98b126e369fe5",
            "instruction": "Sweep beads into a cleaning pan using a sweeper on a green tablecloth while sitting.",
            "relation": "Same episode",
            "anchorDeltaSeconds": 26.9
          },
          {
            "rank": 4,
            "id": "a2a75c88a3e5e67fca90c2d0",
            "instruction": "Sweep beads into the cleaning pan using the sweeper on a green tablecloth while sitting.",
            "relation": "Other episode",
            "anchorDeltaSeconds": null
          },
          {
            "rank": 5,
            "id": "19189fc30f37fb1a48478d99",
            "instruction": "Sweep beads into a cleaning pan using a sweeper on a green tablecloth while sitting.",
            "relation": "Same episode",
            "anchorDeltaSeconds": 26.866666666666667
          },
          {
            "rank": 6,
            "id": "61221c696616f3e06b7e9d9f",
            "instruction": "Gather beads using a sweeper brush and push them into a dustpan on a wooden tablecloth.",
            "relation": "Other episode",
            "anchorDeltaSeconds": null
          },
          {
            "rank": 7,
            "id": "0dfc3f93292eb1310d222a72",
            "instruction": "Gather beads using a sweeper brush and push them into a dustpan.",
            "relation": "Other episode",
            "anchorDeltaSeconds": null
          },
          {
            "rank": 8,
            "id": "cd18cca02aa21fd03e90a87e",
            "instruction": "Gather beads using a sweeper brush and push them into a dustpan.",
            "relation": "Other episode",
            "anchorDeltaSeconds": null
          },
          {
            "rank": 9,
            "id": "51b711c5d86e5fb2153449ab",
            "instruction": "Use chopsticks to move strings from one bowl to another while sitting at a table with a green tablecloth.",
            "relation": "Other episode",
            "anchorDeltaSeconds": null
          },
          {
            "rank": 10,
            "id": "ee60bd778ec7226acd9569e8",
            "instruction": "Gather beads using a sweeper brush and push them into a dustpan on a wooden tablecloth.",
            "relation": "Other episode",
            "anchorDeltaSeconds": null
          }
        ],
        "top1Relation": "Exact clip",
        "top1DeltaSeconds": 0
      },
      {
        "id": "omni",
        "name": "Omni-Embed-Nemotron-3B",
        "input": "V + L",
        "pairedRank": 1,
        "firstEpisodeRank": 1,
        "firstEpisodeRankStatus": "Observed in archived Top-10",
        "gallerySize": 8000,
        "top10": [
          {
            "rank": 1,
            "id": "e3857b9c9e763cb94c91105c",
            "instruction": "Sweep beads into a cleaning pan using a sweeper on a green tablecloth while sitting.",
            "relation": "Exact clip",
            "anchorDeltaSeconds": 0
          },
          {
            "rank": 2,
            "id": "19189fc30f37fb1a48478d99",
            "instruction": "Sweep beads into a cleaning pan using a sweeper on a green tablecloth while sitting.",
            "relation": "Same episode",
            "anchorDeltaSeconds": 26.866666666666667
          },
          {
            "rank": 3,
            "id": "0bf381135f6b632afae0ea5d",
            "instruction": "Sweep beads into the cleaning pan using the sweeper on a green tablecloth while sitting.",
            "relation": "Other episode",
            "anchorDeltaSeconds": null
          },
          {
            "rank": 4,
            "id": "a31b108618f98b126e369fe5",
            "instruction": "Sweep beads into a cleaning pan using a sweeper on a green tablecloth while sitting.",
            "relation": "Same episode",
            "anchorDeltaSeconds": 26.9
          },
          {
            "rank": 5,
            "id": "a2a75c88a3e5e67fca90c2d0",
            "instruction": "Sweep beads into the cleaning pan using the sweeper on a green tablecloth while sitting.",
            "relation": "Other episode",
            "anchorDeltaSeconds": null
          },
          {
            "rank": 6,
            "id": "61221c696616f3e06b7e9d9f",
            "instruction": "Gather beads using a sweeper brush and push them into a dustpan on a wooden tablecloth.",
            "relation": "Other episode",
            "anchorDeltaSeconds": null
          },
          {
            "rank": 7,
            "id": "ee60bd778ec7226acd9569e8",
            "instruction": "Gather beads using a sweeper brush and push them into a dustpan on a wooden tablecloth.",
            "relation": "Other episode",
            "anchorDeltaSeconds": null
          },
          {
            "rank": 8,
            "id": "0dfc3f93292eb1310d222a72",
            "instruction": "Gather beads using a sweeper brush and push them into a dustpan.",
            "relation": "Other episode",
            "anchorDeltaSeconds": null
          },
          {
            "rank": 9,
            "id": "cd18cca02aa21fd03e90a87e",
            "instruction": "Gather beads using a sweeper brush and push them into a dustpan.",
            "relation": "Other episode",
            "anchorDeltaSeconds": null
          },
          {
            "rank": 10,
            "id": "26fd885ef3c64104a71a6728",
            "instruction": "Use chopsticks to move strings from one bowl to another while sitting at a table with a green tablecloth.",
            "relation": "Other episode",
            "anchorDeltaSeconds": null
          }
        ],
        "top1Relation": "Exact clip",
        "top1DeltaSeconds": 0
      },
      {
        "id": "physis",
        "name": "Robota-Embed",
        "input": "V + L + A",
        "pairedRank": 1,
        "firstEpisodeRank": 1,
        "firstEpisodeRankStatus": "Observed in archived Top-10",
        "gallerySize": 8000,
        "top10": [
          {
            "rank": 1,
            "id": "e3857b9c9e763cb94c91105c",
            "instruction": "Sweep beads into a cleaning pan using a sweeper on a green tablecloth while sitting.",
            "relation": "Exact clip",
            "anchorDeltaSeconds": 0
          },
          {
            "rank": 2,
            "id": "8353a3bc23a18729790b9197",
            "instruction": "Dry hands using a blue cloth while sitting at a green tablecloth with a blue background.",
            "relation": "Other episode",
            "anchorDeltaSeconds": null
          },
          {
            "rank": 3,
            "id": "e480ad6e1564f7680c017c08",
            "instruction": "Dry hands using a blue cloth while sitting at a green tablecloth with a blue background.",
            "relation": "Other episode",
            "anchorDeltaSeconds": null
          },
          {
            "rank": 4,
            "id": "8ac7c23cf722e16985ea7316",
            "instruction": "Dry hands using a blue cloth while sitting at a green tablecloth with a blue background.",
            "relation": "Other episode",
            "anchorDeltaSeconds": null
          },
          {
            "rank": 5,
            "id": "3c3de7d1439ff21889cb2590",
            "instruction": "Insert a tennis ball into a container while sitting against a lavender background.",
            "relation": "Other episode",
            "anchorDeltaSeconds": null
          },
          {
            "rank": 6,
            "id": "590d9e38fe9afe61619c241d",
            "instruction": "Insert a tennis ball into a container while sitting against a lavender background.",
            "relation": "Other episode",
            "anchorDeltaSeconds": null
          },
          {
            "rank": 7,
            "id": "0e421a6c41dc2085b562fdb2",
            "instruction": "Insert a tennis ball into a container while sitting against a lavender background.",
            "relation": "Other episode",
            "anchorDeltaSeconds": null
          },
          {
            "rank": 8,
            "id": "c3c57d6e3352565c193f4b75",
            "instruction": "Move the bottle of dishwashing liquid away from the faucet",
            "relation": "Other episode",
            "anchorDeltaSeconds": null
          },
          {
            "rank": 9,
            "id": "00fb9581a507a9c9cb685b2d",
            "instruction": "push the plate to the front of the stove",
            "relation": "Other episode",
            "anchorDeltaSeconds": null
          },
          {
            "rank": 10,
            "id": "6bcad621ffbad309f434ee31",
            "instruction": "pick gray plate from plate low rack and place it on table with left arm",
            "relation": "Other episode",
            "anchorDeltaSeconds": null
          }
        ],
        "top1Relation": "Exact clip",
        "top1DeltaSeconds": 0
      }
    ]
  },
  {
    "id": "droid-temporal-near-miss",
    "source": "DROID",
    "category": "Temporal near-miss",
    "instruction": "Unfold the cloth on the counter",
    "queryId": "2432999056895875059633be",
    "actionDim": 10,
    "actionSchema": "droid_relative_eef_rot6d_gripper_v1",
    "anchorSeconds": 16,
    "insight": "Robota-Embed retrieves the same episode one second before the paired anchor; the exact clip ranks second. Gemini and Omni also retrieve that episode, but their Top-1 anchors are 21 and 28 seconds later.",
    "models": [
      {
        "id": "gemini",
        "name": "Gemini Embedding 2",
        "input": "V + L",
        "pairedRank": 5,
        "firstEpisodeRank": 1,
        "firstEpisodeRankStatus": "Observed in archived Top-10",
        "gallerySize": 7983,
        "top10": [
          {
            "rank": 1,
            "id": "ea4b439fa68ad91d9b526947",
            "instruction": "Unfold the cloth on the counter",
            "relation": "Same episode",
            "anchorDeltaSeconds": 21
          },
          {
            "rank": 2,
            "id": "5ba3c9e6a417265700eee41c",
            "instruction": "Unfold the cloth on the counter",
            "relation": "Same episode",
            "anchorDeltaSeconds": 16
          },
          {
            "rank": 3,
            "id": "cce4933d6e459d4b5c04e0dc",
            "instruction": "Unfold the cloth on the counter",
            "relation": "Same episode",
            "anchorDeltaSeconds": 24
          },
          {
            "rank": 4,
            "id": "9e459295cd5f87db36063b63",
            "instruction": "Unfold the cloth on the counter",
            "relation": "Same episode",
            "anchorDeltaSeconds": 28
          },
          {
            "rank": 5,
            "id": "2432999056895875059633be",
            "instruction": "Unfold the cloth on the counter",
            "relation": "Exact clip",
            "anchorDeltaSeconds": 0
          },
          {
            "rank": 6,
            "id": "6f9b21ef257db18e8e02297d",
            "instruction": "Unfold the cloth on the counter",
            "relation": "Same episode",
            "anchorDeltaSeconds": 4
          },
          {
            "rank": 7,
            "id": "22daec3223d4069bb10a44a9",
            "instruction": "Unfold the cloth on the counter",
            "relation": "Same episode",
            "anchorDeltaSeconds": 8
          },
          {
            "rank": 8,
            "id": "76cb9d254d559cd6ec090d9a",
            "instruction": "Unfold the cloth on the counter",
            "relation": "Same episode",
            "anchorDeltaSeconds": 32
          },
          {
            "rank": 9,
            "id": "bff484a19a560edb86e3ed3c",
            "instruction": "Unfold the cloth on the counter",
            "relation": "Same episode",
            "anchorDeltaSeconds": -1
          },
          {
            "rank": 10,
            "id": "1aef05227f0d39955a43a7a3",
            "instruction": "Unfold the towel on the table.",
            "relation": "Other episode",
            "anchorDeltaSeconds": null
          }
        ],
        "top1Relation": "Same episode",
        "top1DeltaSeconds": 21
      },
      {
        "id": "omni",
        "name": "Omni-Embed-Nemotron-3B",
        "input": "V + L",
        "pairedRank": 4,
        "firstEpisodeRank": 1,
        "firstEpisodeRankStatus": "Observed in archived Top-10",
        "gallerySize": 8000,
        "top10": [
          {
            "rank": 1,
            "id": "9e459295cd5f87db36063b63",
            "instruction": "Unfold the cloth on the counter",
            "relation": "Same episode",
            "anchorDeltaSeconds": 28
          },
          {
            "rank": 2,
            "id": "cce4933d6e459d4b5c04e0dc",
            "instruction": "Unfold the cloth on the counter",
            "relation": "Same episode",
            "anchorDeltaSeconds": 24
          },
          {
            "rank": 3,
            "id": "5ba3c9e6a417265700eee41c",
            "instruction": "Unfold the cloth on the counter",
            "relation": "Same episode",
            "anchorDeltaSeconds": 16
          },
          {
            "rank": 4,
            "id": "2432999056895875059633be",
            "instruction": "Unfold the cloth on the counter",
            "relation": "Exact clip",
            "anchorDeltaSeconds": 0
          },
          {
            "rank": 5,
            "id": "76cb9d254d559cd6ec090d9a",
            "instruction": "Unfold the cloth on the counter",
            "relation": "Same episode",
            "anchorDeltaSeconds": 32
          },
          {
            "rank": 6,
            "id": "6f9b21ef257db18e8e02297d",
            "instruction": "Unfold the cloth on the counter",
            "relation": "Same episode",
            "anchorDeltaSeconds": 4
          },
          {
            "rank": 7,
            "id": "bff484a19a560edb86e3ed3c",
            "instruction": "Unfold the cloth on the counter",
            "relation": "Same episode",
            "anchorDeltaSeconds": -1
          },
          {
            "rank": 8,
            "id": "22daec3223d4069bb10a44a9",
            "instruction": "Unfold the cloth on the counter",
            "relation": "Same episode",
            "anchorDeltaSeconds": 8
          },
          {
            "rank": 9,
            "id": "ea4b439fa68ad91d9b526947",
            "instruction": "Unfold the cloth on the counter",
            "relation": "Same episode",
            "anchorDeltaSeconds": 21
          },
          {
            "rank": 10,
            "id": "b07b4b871b9e033f85e864b4",
            "instruction": "Fold up the white towel on the counter.",
            "relation": "Other episode",
            "anchorDeltaSeconds": null
          }
        ],
        "top1Relation": "Same episode",
        "top1DeltaSeconds": 28
      },
      {
        "id": "physis",
        "name": "Robota-Embed",
        "input": "V + L + A",
        "pairedRank": 2,
        "firstEpisodeRank": 1,
        "firstEpisodeRankStatus": "Observed in archived Top-10",
        "gallerySize": 8000,
        "top10": [
          {
            "rank": 1,
            "id": "bff484a19a560edb86e3ed3c",
            "instruction": "Unfold the cloth on the counter",
            "relation": "Same episode",
            "anchorDeltaSeconds": -1
          },
          {
            "rank": 2,
            "id": "2432999056895875059633be",
            "instruction": "Unfold the cloth on the counter",
            "relation": "Exact clip",
            "anchorDeltaSeconds": 0
          },
          {
            "rank": 3,
            "id": "ea4b439fa68ad91d9b526947",
            "instruction": "Unfold the cloth on the counter",
            "relation": "Same episode",
            "anchorDeltaSeconds": 21
          },
          {
            "rank": 4,
            "id": "5ba3c9e6a417265700eee41c",
            "instruction": "Unfold the cloth on the counter",
            "relation": "Same episode",
            "anchorDeltaSeconds": 16
          },
          {
            "rank": 5,
            "id": "22daec3223d4069bb10a44a9",
            "instruction": "Unfold the cloth on the counter",
            "relation": "Same episode",
            "anchorDeltaSeconds": 8
          },
          {
            "rank": 6,
            "id": "cce4933d6e459d4b5c04e0dc",
            "instruction": "Unfold the cloth on the counter",
            "relation": "Same episode",
            "anchorDeltaSeconds": 24
          },
          {
            "rank": 7,
            "id": "76cb9d254d559cd6ec090d9a",
            "instruction": "Unfold the cloth on the counter",
            "relation": "Same episode",
            "anchorDeltaSeconds": 32
          },
          {
            "rank": 8,
            "id": "6f9b21ef257db18e8e02297d",
            "instruction": "Unfold the cloth on the counter",
            "relation": "Same episode",
            "anchorDeltaSeconds": 4
          },
          {
            "rank": 9,
            "id": "9e459295cd5f87db36063b63",
            "instruction": "Unfold the cloth on the counter",
            "relation": "Same episode",
            "anchorDeltaSeconds": 28
          },
          {
            "rank": 10,
            "id": "c46b7af29dfa17cfe6d5f455",
            "instruction": "Use the wooden spoon to stir the white bowl.",
            "relation": "Other episode",
            "anchorDeltaSeconds": null
          }
        ],
        "top1Relation": "Same episode",
        "top1DeltaSeconds": -1
      }
    ]
  },
  {
    "id": "libero-hard-distractor",
    "source": "LIBERO",
    "category": "Hard distractor",
    "instruction": "pick up the bbq sauce and place it in the basket",
    "queryId": "873ae9a19fbf389acf513105",
    "actionDim": 10,
    "actionSchema": "libero_native_frame_wise_relative_rot6d_gripper_v1",
    "anchorSeconds": 3.1,
    "insight": "Robota-Embed ranks the exact future first among same-instruction candidates. Gemini's Top-1 comes from another episode, while Omni returns a later window from the query episode.",
    "models": [
      {
        "id": "gemini",
        "name": "Gemini Embedding 2",
        "input": "V + L",
        "pairedRank": 35,
        "firstEpisodeRank": 6,
        "firstEpisodeRankStatus": "Observed in archived Top-10",
        "gallerySize": 7983,
        "top10": [
          {
            "rank": 1,
            "id": "9c3bacbc6e69101dd5ce7f36",
            "instruction": "pick up the bbq sauce and place it in the basket",
            "relation": "Other episode",
            "anchorDeltaSeconds": null
          },
          {
            "rank": 2,
            "id": "0e4f444320c2efe5265bdcc3",
            "instruction": "pick up the bbq sauce and place it in the basket",
            "relation": "Other episode",
            "anchorDeltaSeconds": null
          },
          {
            "rank": 3,
            "id": "6400b164361b26d00f73d159",
            "instruction": "pick up the bbq sauce and place it in the basket",
            "relation": "Other episode",
            "anchorDeltaSeconds": null
          },
          {
            "rank": 4,
            "id": "56ca3020cc60b780a8cd57d2",
            "instruction": "pick up the bbq sauce and place it in the basket",
            "relation": "Other episode",
            "anchorDeltaSeconds": null
          },
          {
            "rank": 5,
            "id": "03488f91e289806d8d82b4b1",
            "instruction": "pick up the bbq sauce and place it in the basket",
            "relation": "Other episode",
            "anchorDeltaSeconds": null
          },
          {
            "rank": 6,
            "id": "204f3a3b16e8416ccc36fa53",
            "instruction": "pick up the bbq sauce and place it in the basket",
            "relation": "Same episode",
            "anchorDeltaSeconds": 2.8000000000000003
          },
          {
            "rank": 7,
            "id": "502aa2d18f54e3daaedfbe44",
            "instruction": "pick up the bbq sauce and place it in the basket",
            "relation": "Other episode",
            "anchorDeltaSeconds": null
          },
          {
            "rank": 8,
            "id": "1d6fefd760cf172cfe9acf01",
            "instruction": "pick up the bbq sauce and place it in the basket",
            "relation": "Other episode",
            "anchorDeltaSeconds": null
          },
          {
            "rank": 9,
            "id": "d75ace914eade49aa5072ee1",
            "instruction": "pick up the bbq sauce and place it in the basket",
            "relation": "Other episode",
            "anchorDeltaSeconds": null
          },
          {
            "rank": 10,
            "id": "bc57ceba1c6ea36ee91c32c6",
            "instruction": "pick up the bbq sauce and place it in the basket",
            "relation": "Other episode",
            "anchorDeltaSeconds": null
          }
        ],
        "top1Relation": "Other episode",
        "top1DeltaSeconds": null
      },
      {
        "id": "omni",
        "name": "Omni-Embed-Nemotron-3B",
        "input": "V + L",
        "pairedRank": 50,
        "firstEpisodeRank": 1,
        "firstEpisodeRankStatus": "Observed in archived Top-10",
        "gallerySize": 8000,
        "top10": [
          {
            "rank": 1,
            "id": "204f3a3b16e8416ccc36fa53",
            "instruction": "pick up the bbq sauce and place it in the basket",
            "relation": "Same episode",
            "anchorDeltaSeconds": 2.8000000000000003
          },
          {
            "rank": 2,
            "id": "633af771b7d369af2a7d336b",
            "instruction": "pick up the bbq sauce and place it in the basket",
            "relation": "Other episode",
            "anchorDeltaSeconds": null
          },
          {
            "rank": 3,
            "id": "a57e9ad7f48f579f5672c1a7",
            "instruction": "pick up the bbq sauce and place it in the basket",
            "relation": "Other episode",
            "anchorDeltaSeconds": null
          },
          {
            "rank": 4,
            "id": "23ab81c86f83d60027b896ef",
            "instruction": "pick up the bbq sauce and place it in the basket",
            "relation": "Other episode",
            "anchorDeltaSeconds": null
          },
          {
            "rank": 5,
            "id": "744b6827ed976bed7f81b8d8",
            "instruction": "pick up the bbq sauce and place it in the basket",
            "relation": "Other episode",
            "anchorDeltaSeconds": null
          },
          {
            "rank": 6,
            "id": "9234beddcf444b694e642fff",
            "instruction": "pick up the bbq sauce and place it in the basket",
            "relation": "Other episode",
            "anchorDeltaSeconds": null
          },
          {
            "rank": 7,
            "id": "5eb9d212a032816f999be3bb",
            "instruction": "pick up the bbq sauce and place it in the basket",
            "relation": "Other episode",
            "anchorDeltaSeconds": null
          },
          {
            "rank": 8,
            "id": "2c63d5e8543d3d51e36d1ef2",
            "instruction": "pick up the bbq sauce and place it in the basket",
            "relation": "Other episode",
            "anchorDeltaSeconds": null
          },
          {
            "rank": 9,
            "id": "876da2e935aac3a20c3887c4",
            "instruction": "pick up the bbq sauce and place it in the basket",
            "relation": "Other episode",
            "anchorDeltaSeconds": null
          },
          {
            "rank": 10,
            "id": "36cfa4e84e42cecf7707ab05",
            "instruction": "pick up the bbq sauce and place it in the basket",
            "relation": "Other episode",
            "anchorDeltaSeconds": null
          }
        ],
        "top1Relation": "Same episode",
        "top1DeltaSeconds": 2.8000000000000003
      },
      {
        "id": "physis",
        "name": "Robota-Embed",
        "input": "V + L + A",
        "pairedRank": 1,
        "firstEpisodeRank": 1,
        "firstEpisodeRankStatus": "Observed in archived Top-10",
        "gallerySize": 8000,
        "top10": [
          {
            "rank": 1,
            "id": "873ae9a19fbf389acf513105",
            "instruction": "pick up the bbq sauce and place it in the basket",
            "relation": "Exact clip",
            "anchorDeltaSeconds": 0
          },
          {
            "rank": 2,
            "id": "e113ff47d60f97f89149ce7a",
            "instruction": "pick up the bbq sauce and place it in the basket",
            "relation": "Other episode",
            "anchorDeltaSeconds": null
          },
          {
            "rank": 3,
            "id": "25d92400a01194cb1a87f6d4",
            "instruction": "pick up the bbq sauce and place it in the basket",
            "relation": "Other episode",
            "anchorDeltaSeconds": null
          },
          {
            "rank": 4,
            "id": "a7d14253293f410ffda3c63d",
            "instruction": "pick up the tomato sauce and place it in the basket",
            "relation": "Other episode",
            "anchorDeltaSeconds": null
          },
          {
            "rank": 5,
            "id": "96aea8baef47e911398af61e",
            "instruction": "pick up the bbq sauce and place it in the basket",
            "relation": "Other episode",
            "anchorDeltaSeconds": null
          },
          {
            "rank": 6,
            "id": "56219e285201fb7b963e9358",
            "instruction": "pick up the tomato sauce and place it in the basket",
            "relation": "Other episode",
            "anchorDeltaSeconds": null
          },
          {
            "rank": 7,
            "id": "876da2e935aac3a20c3887c4",
            "instruction": "pick up the bbq sauce and place it in the basket",
            "relation": "Other episode",
            "anchorDeltaSeconds": null
          },
          {
            "rank": 8,
            "id": "74b4276f99cb5a712f08aeb7",
            "instruction": "pick up the tomato sauce and place it in the basket",
            "relation": "Other episode",
            "anchorDeltaSeconds": null
          },
          {
            "rank": 9,
            "id": "7e9891596cc1babbac28f881",
            "instruction": "pick up the tomato sauce and place it in the basket",
            "relation": "Other episode",
            "anchorDeltaSeconds": null
          },
          {
            "rank": 10,
            "id": "5eb9d212a032816f999be3bb",
            "instruction": "pick up the bbq sauce and place it in the basket",
            "relation": "Other episode",
            "anchorDeltaSeconds": null
          }
        ],
        "top1Relation": "Exact clip",
        "top1DeltaSeconds": 0
      }
    ],
    "hardDistractor": {
      "id": "e113ff47d60f97f89149ce7a",
      "rank": 2,
      "instruction": "pick up the bbq sauce and place it in the basket",
      "relation": "Other episode"
    }
  },
  {
    "id": "robomind-failure-boundary",
    "source": "RoboMIND–Franka-dual",
    "category": "Failure boundary",
    "instruction": "push gray plate to right table with left arm",
    "queryId": "d911d7ab396b87a80616d6a9",
    "actionDim": 20,
    "actionSchema": "cosmos3_robomind_dual_franka_left_then_right_20d_v1",
    "anchorSeconds": 2.7,
    "insight": "All three Top-1 clips share the task instruction but come from other episodes. The exact paired clip ranks 63rd for Robota-Embed, showing a boundary in episode and clip identity.",
    "models": [
      {
        "id": "gemini",
        "name": "Gemini Embedding 2",
        "input": "V + L",
        "pairedRank": 369,
        "firstEpisodeRank": null,
        "firstEpisodeRankStatus": "Not present in archived Top-10",
        "gallerySize": 7983,
        "top10": [
          {
            "rank": 1,
            "id": "8725a029bfcc4652752b9cc1",
            "instruction": "push gray plate to right table with left arm",
            "relation": "Other episode",
            "anchorDeltaSeconds": null
          },
          {
            "rank": 2,
            "id": "48b64ec9af8fe708a7848a80",
            "instruction": "push gray plate to right table with left arm",
            "relation": "Other episode",
            "anchorDeltaSeconds": null
          },
          {
            "rank": 3,
            "id": "5129bf7c1eef96a20d9974ac",
            "instruction": "push gray plate to right table with left arm",
            "relation": "Other episode",
            "anchorDeltaSeconds": null
          },
          {
            "rank": 4,
            "id": "cbd8c2b0e87b54d26f89d6d4",
            "instruction": "push gray plate to right table with left arm",
            "relation": "Other episode",
            "anchorDeltaSeconds": null
          },
          {
            "rank": 5,
            "id": "edaecc35c57332df8e61388c",
            "instruction": "push gray plate to right table with left arm",
            "relation": "Other episode",
            "anchorDeltaSeconds": null
          },
          {
            "rank": 6,
            "id": "6345fcb68ea22d7e51c8807c",
            "instruction": "push gray plate to right table with left arm",
            "relation": "Other episode",
            "anchorDeltaSeconds": null
          },
          {
            "rank": 7,
            "id": "f73ab48f8eda96251fb91319",
            "instruction": "push gray plate to right table with left arm",
            "relation": "Other episode",
            "anchorDeltaSeconds": null
          },
          {
            "rank": 8,
            "id": "ef6886e1860dbfbb356ea4c7",
            "instruction": "push gray plate to right table with left arm",
            "relation": "Other episode",
            "anchorDeltaSeconds": null
          },
          {
            "rank": 9,
            "id": "d7d1e36b95c2a6ed84d0fb98",
            "instruction": "push gray plate to right table with left arm",
            "relation": "Other episode",
            "anchorDeltaSeconds": null
          },
          {
            "rank": 10,
            "id": "028c2f7c844795a0a9de27ad",
            "instruction": "push gray plate to right table with left arm",
            "relation": "Other episode",
            "anchorDeltaSeconds": null
          }
        ],
        "top1Relation": "Other episode",
        "top1DeltaSeconds": null
      },
      {
        "id": "omni",
        "name": "Omni-Embed-Nemotron-3B",
        "input": "V + L",
        "pairedRank": 203,
        "firstEpisodeRank": null,
        "firstEpisodeRankStatus": "Not present in archived Top-10",
        "gallerySize": 8000,
        "top10": [
          {
            "rank": 1,
            "id": "787d20ffca1c742dd3880adf",
            "instruction": "push gray plate to right table with left arm",
            "relation": "Other episode",
            "anchorDeltaSeconds": null
          },
          {
            "rank": 2,
            "id": "2b7ca50eabcc5a55df3f41d6",
            "instruction": "push gray plate to right table with left arm",
            "relation": "Other episode",
            "anchorDeltaSeconds": null
          },
          {
            "rank": 3,
            "id": "259368980474eb1ac6ec564c",
            "instruction": "push gray plate to right table with left arm",
            "relation": "Other episode",
            "anchorDeltaSeconds": null
          },
          {
            "rank": 4,
            "id": "7e1e40685535202fee16a13d",
            "instruction": "push gray plate to right table with left arm",
            "relation": "Other episode",
            "anchorDeltaSeconds": null
          },
          {
            "rank": 5,
            "id": "6345fcb68ea22d7e51c8807c",
            "instruction": "push gray plate to right table with left arm",
            "relation": "Other episode",
            "anchorDeltaSeconds": null
          },
          {
            "rank": 6,
            "id": "c3ea604877ff30ce20b4f5d1",
            "instruction": "push gray plate to right table with left arm",
            "relation": "Other episode",
            "anchorDeltaSeconds": null
          },
          {
            "rank": 7,
            "id": "08d9fcdb4bb63c8e11afb0f6",
            "instruction": "push gray plate to right table with left arm",
            "relation": "Other episode",
            "anchorDeltaSeconds": null
          },
          {
            "rank": 8,
            "id": "594698ed9f26d74d5740dc4f",
            "instruction": "push gray plate to right table with left arm",
            "relation": "Other episode",
            "anchorDeltaSeconds": null
          },
          {
            "rank": 9,
            "id": "7dbfe4f61d78ef29e9186668",
            "instruction": "push gray plate to right table with left arm",
            "relation": "Other episode",
            "anchorDeltaSeconds": null
          },
          {
            "rank": 10,
            "id": "7b34866ee4dd93d72c6d3c3a",
            "instruction": "push gray plate to right table with left arm",
            "relation": "Other episode",
            "anchorDeltaSeconds": null
          }
        ],
        "top1Relation": "Other episode",
        "top1DeltaSeconds": null
      },
      {
        "id": "physis",
        "name": "Robota-Embed",
        "input": "V + L + A",
        "pairedRank": 63,
        "firstEpisodeRank": null,
        "firstEpisodeRankStatus": "Not present in archived Top-10",
        "gallerySize": 8000,
        "top10": [
          {
            "rank": 1,
            "id": "c0ded897949c773c14981f46",
            "instruction": "push gray plate to right table with left arm",
            "relation": "Other episode",
            "anchorDeltaSeconds": null
          },
          {
            "rank": 2,
            "id": "d7bc2d8a1914ed4ac3378b95",
            "instruction": "push gray plate to right table with left arm",
            "relation": "Other episode",
            "anchorDeltaSeconds": null
          },
          {
            "rank": 3,
            "id": "787d20ffca1c742dd3880adf",
            "instruction": "push gray plate to right table with left arm",
            "relation": "Other episode",
            "anchorDeltaSeconds": null
          },
          {
            "rank": 4,
            "id": "7e1e40685535202fee16a13d",
            "instruction": "push gray plate to right table with left arm",
            "relation": "Other episode",
            "anchorDeltaSeconds": null
          },
          {
            "rank": 5,
            "id": "8725a029bfcc4652752b9cc1",
            "instruction": "push gray plate to right table with left arm",
            "relation": "Other episode",
            "anchorDeltaSeconds": null
          },
          {
            "rank": 6,
            "id": "2ca41c3ed0e3eed5bcfc9dda",
            "instruction": "push gray plate to right table with left arm",
            "relation": "Other episode",
            "anchorDeltaSeconds": null
          },
          {
            "rank": 7,
            "id": "46152b17ebc87171921440b9",
            "instruction": "push gray plate to right table with left arm",
            "relation": "Other episode",
            "anchorDeltaSeconds": null
          },
          {
            "rank": 8,
            "id": "0f398a7be3558fb2cfc652ac",
            "instruction": "push gray plate to right table with left arm",
            "relation": "Other episode",
            "anchorDeltaSeconds": null
          },
          {
            "rank": 9,
            "id": "5166f6d10de8004eda40291e",
            "instruction": "push gray plate to right table with left arm",
            "relation": "Other episode",
            "anchorDeltaSeconds": null
          },
          {
            "rank": 10,
            "id": "e7432f9fc1bf0bb2d6fc3a83",
            "instruction": "push gray plate to right table with left arm",
            "relation": "Other episode",
            "anchorDeltaSeconds": null
          }
        ],
        "top1Relation": "Other episode",
        "top1DeltaSeconds": null
      }
    ]
  }
];
